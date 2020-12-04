const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  //'cid'
];

const parsePassports = (input) =>
  input
    .split("\n\n")
    .filter((s) => s)
    .map((passport) => {
      return Object.assign(
        {},
        ...passport
          .split(/\s|\n/g)
          .filter((s) => s)
          .map((l) => {
            const [key, value] = l.split(":");
            return { [key]: value };
          })
      );
    });

const hasRequiredFields = (passportData) =>
  requiredFields.every((field) => passportData[field] != null);

const isValid = (passportData) =>
  passportData.byr.match(/^\d{4}$/) &&
  +passportData.byr <= 2002 &&
  +passportData.byr >= 1920 &&
  passportData.iyr.match(/^\d{4}$/) &&
  +passportData.iyr <= 2020 &&
  +passportData.iyr >= 2010 &&
  passportData.eyr.match(/^\d{4}$/) &&
  +passportData.eyr <= 2030 &&
  +passportData.eyr >= 2020 &&
  passportData.hcl.match(/^#[0-9a-f]{6}$/) &&
  passportData.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/) &&
  passportData.pid.match(/^\d{9}$/) &&
  ((passportData.hgt.match(/^(\d+)cm$/) &&
    +RegExp.$1 <= 193 &&
    +RegExp.$1 >= 150) ||
    (passportData.hgt.match(/^(\d+)in$/) &&
      +RegExp.$1 <= 76 &&
      +RegExp.$1 >= 59));

module.exports = async (input) => {
  const passports = parsePassports(input);

  const stage1 = passports.filter(hasRequiredFields);
  const stage2 = stage1.filter(isValid);

  return [stage1.length, stage2.length];
};
