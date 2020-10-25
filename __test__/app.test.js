import { calculateCountdown, weatherTemplate } from "../src/client/js/app";

describe("Testing app functionality", () => {
  test("Testing countdown input", () => {
    expect(
      calculateCountdown(
        new Date(2020, 10, 10).getTime(),
        new Date(2020, 10, 11).getTime()
      )
    ).toBe(1);
  });
  test("Testing weather template forecast", () => {
    let mockData = {
      weatherType: "forecast",
      weather: {
        weather: {
          icon: "r04d",
          code: 520,
          description: "Light shower rain",
        },
        high_temp: 51.4,
        low_temp: 49.9,
      },
    };
    expect(weatherTemplate(mockData)).toMatch(
      /Weather forecast:[\s\S]*weather-table[\s\S]*weather-icon[\s\S]*High: 51.4 F, Low: 49.9 F[\s\S]*Light shower rain[\s\S]*table>/
    );
  });
  test("Testing weather template normals", () => {
    let mockData = {
      weatherType: "normals",
      weather: {
        temp: 64.5,
        max_temp: 71.4,
        min_temp: 49.9,
      },
    };
    expect(weatherTemplate(mockData)).toMatch(
      /Typical weather[\s\S]*Avg: 64.5 F, Max: 71.4 F, Min: 49.9 F/
    );
  });
});
