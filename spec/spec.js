const validator = require('../index.js')

describe("Valid New Zealand Tax Numbers", function() {

  it("should return true for IRD number 49091850", function() {
    expect(validator.isValidIRDNumber('49091850')).toBe(true);
  });

  it("should return true for IRD number 35901981", function() {
    expect(validator.isValidIRDNumber('35901981')).toBe(true);
  });

  it("should return true for IRD number 49098576", function() {
    expect(validator.isValidIRDNumber('49098576')).toBe(true);
  });

  it("should return true for IRD number 136410132", function() {
    expect(validator.isValidIRDNumber('136410132')).toBe(true);
  });

  it("should return false for IRD number 136410133", function() {
    expect(validator.isValidIRDNumber('136410133')).toBe(false);
  });

  it("should return false for IRD number 9125568", function() {
    expect(validator.isValidIRDNumber('9125568')).toBe(false);
  });

});