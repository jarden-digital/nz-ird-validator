const validator = require("../index.js");

describe("Valid New Zealand Tax Numbers", function () {
  it("should pass IRD number 49091850", function () {
    expect(validator.isValidIRDNumber("49091850")).toBe(true);
  });

  it("should pass IRD number 49-091-850", function () {
    expect(validator.isValidIRDNumber("49-091-850")).toBe(true);
  });

  it("should pass IRD number 35901981", function () {
    expect(validator.isValidIRDNumber("35901981")).toBe(true);
  });

  it("should pass IRD number 49098576", function () {
    expect(validator.isValidIRDNumber("49098576")).toBe(true);
  });

  it("should pass IRD number 136410132", function () {
    expect(validator.isValidIRDNumber("136410132")).toBe(true);
  });

  it("should pass IRD number 136-410-132", function () {
    expect(validator.isValidIRDNumber("136-410-132")).toBe(true);
  });
});
describe("Invalid New Zealand Tax Numbers", function () {
  it("should reject bad checkdigit 136410133", function () {
    expect(validator.isValidIRDNumber("136410133")).toBe(false);
  });

  it("should reject bad checkdigit with dashes 136-410-133", function () {
    expect(validator.isValidIRDNumber("136-410-133")).toBe(false);
  });
  it("should reject valid IRD number with bad dashes 136410-132", function () {
    expect(validator.isValidIRDNumber("136410-132")).toBe(false);
  });
  it("should reject long IRD number 0136410132", function () {
    expect(validator.isValidIRDNumber("0136410132")).toBe(false);
  });
});
