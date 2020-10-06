const leftPad = (value, desiredLength, padding) => {
  const input = value.toString() 
  const lengthDifference = Math.max(desiredLength - input.length, 0)
  const filler = new Array(lengthDifference).fill(padding).join('')
  return filler + input
}

const getFormatCheck = (format) => {
  // 'dashes' | 'numeric' | 'either'
  if(format === 'dashes') return /^\d{2,3}-\d{3}-\d{3}$/;
  else if(format === 'numeric') return /^\d{8,9}$/;
  else if (format === 'either') return /^(?:\d{2,3}-\d{3}-\d{3}|\d{8,9})$/;
  throw new Error(`Unknown format, should be one of: 'dashes' | 'numeric' | 'either' `)
}

const getCheckDigit = (ird, weightFactor) => {
  const checkDigit =
    ird
      .split("")
      .map((v, i) => +v * +weightFactor.split("")[i])
      .reduce((acc, curr) => acc + curr) % 11;
  if (checkDigit === 0) return 0;
  else return 11 - checkDigit;
};

const isValidIRDNumber = (options) => (irdNumber) => {
  const checkDashes = getFormatCheck(options.requireFormat)
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


const defaultOptions = {
  requireFormat: 'either' // 'dashes' | 'numeric' | 'either'
}

const processConfiguration = (userConfig = {}) => ({ ...defaultOptions, ...userConfig })

exports.isValidIRDNumber = isValidIRDNumber({ requireFormat: 'either' });

exports.configureValidator = (userConfig) => isValidIRDNumber(processConfiguration(userConfig))
