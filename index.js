const leftPad = require("left-pad");

const getCheckDigit = (ird, weightFactor) => {
  const checkDigit =
    ird
      .split("")
      .map((v, i) => +v * +weightFactor.split("")[i])
      .reduce((acc, curr) => acc + curr) % 11;
  if (checkDigit === 0) return 0;
  else return 11 - checkDigit;
};
const checkDashes = /^(?:\d{2,3}-\d{3}-\d{3}|\d{8,9})$/;
const isValidIRDNumber = (irdNumber) => {
  if (!checkDashes.exec(irdNumber)) {
    // invalid dash locations
    return false;
  }
  const irdToUse = irdNumber.replace(/[- ]/g, "");
  if (+irdToUse < 10000000 || +irdToUse > 150000000) return false;
  let digit = irdToUse.substr(-1);
  let ird = leftPad(irdToUse.substr(0, irdToUse.length - 1), 8, "0");
  const checkDigit = getCheckDigit(ird, "32765432");
  if (checkDigit < 10) return checkDigit === +digit;
  else {
    let secondCheckDigit = getCheckDigit(ird, "74325276");
    if (secondCheckDigit < 10) return secondCheckDigit === +digit;
    else return false;
  }
};

exports.isValidIRDNumber = isValidIRDNumber;
