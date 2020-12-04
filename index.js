const { promisify } = require("util");
const got = require("got");
const fs = require("fs").promises;
const { CookieJar } = require("tough-cookie");

const baseUrl = "https://adventofcode.com";

const MAX_DAYS = 4;

const initGetter = async () => {
  const cookieJar = new CookieJar();
  const setCookie = promisify(cookieJar.setCookie.bind(cookieJar));
  // Load session cookie and inject it
  const session = await fs.readFile("./data/session", { encoding: "utf-8" });
  await setCookie(`session=${session}`, baseUrl);
  return got.extend({
    prefixUrl: baseUrl,
    cookieJar,
  });
};

// get input with cache
const getInput = (get) => async (day) => {
  try {
    return await fs.readFile(`./input/${day}.txt`, 'utf-8');
  }
  catch (e) {
    // todo check error type
    console.warn(`Day ${day} input not in cache, downloading`);
    // download input
    const { body: input } = await get(`2020/day/${day}/input`);
    // write cache (don't wait)
    fs.writeFile(`./input/${day}.txt`, input);
    return input;
  }
};

const main = async () => {
  const getInputLocal = getInput(await initGetter());

  for (let day = 1; day <= MAX_DAYS; day++) {
    // Load input for the day
    const input = await getInputLocal(day);

    // Load solver for it
    const solver = require(`./days/${day}`);
    // Try to solve, or report a problem
    try {
        const result = await solver(input);
        console.log(`Day ${day} result:`, result);
    }
    catch (e) {
        console.error(`Day ${day} error:`, e);
    }
  }
};

main();
