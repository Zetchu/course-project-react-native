import toWeather from "../toWeather";

describe("toWeather", () => {
  it("should return the correct weather for valid codes", () => {
    expect(toWeather(0)).toBe("Clear");
    expect(toWeather(3)).toBe("Overcast");
    expect(toWeather(61)).toBe("Light Rain");
    expect(toWeather(86)).toBe("Heavy Snow");
  });

  it("should throw an error for invalid codes", () => {
    expect(() => toWeather(-1)).toThrow("toWeather: Invalid input.");
    expect(() => toWeather(999)).toThrow("toWeather: Invalid input.");
    expect(() => toWeather("0" as any)).toThrow("toWeather: Invalid input.");
  });
});
