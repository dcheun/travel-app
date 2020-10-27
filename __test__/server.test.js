const request = require("supertest");
const app = require("../src/server/app");

describe("Test the root path", () => {
  test("It should respond to the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the get routes", () => {
  test("It should respond to the all GET route", async () => {
    const response = await request(app).get("/all");
    expect(response.statusCode).toBe(200);
  });

  test("It should receive object with data GET route", async () => {
    const response = await request(app).get("/data");
    expect(response.body).toEqual({});
  });
});

describe("Test API routes", () => {
  test("It should add data with addData POST route", async () => {
    let mockData = {
      location: "California",
      departing: "2020-10-10",
    };
    const response = await request(app)
      .post("/addData")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(mockData));
    expect(response.body).toEqual({
      location: "California",
      departing: "2020-10-10",
    });
  });

  test("It should update data with updateData POST route", async () => {
    let mockData = {
      location: "New York",
      countdown: 3,
    };
    const response = await request(app)
      .post("/updateData")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(mockData));
    expect(response.body).toEqual({
      location: "New York",
      countdown: 3,
      departing: "2020-10-10",
    });
  });

  test("It should clear data with clearData POST route", async () => {
    const response = await request(app).post("/clearData");
    expect(response.body).toEqual({});
  });
});
