import supertest from "supertest";
import { faker } from "@faker-js/faker";

it("Setting a single header", async () => {
  const request = supertest("https://postman-echo.com");

  const res = await request
    .get("/headers")
    .set("mycustomheader", "God is great");

  console.log(res.statusCode);
  console.log(res.body); //this api simply returns the set request headers as body
});

it("Setting multiple headers- way 1", async () => {
  const request = supertest("https://postman-echo.com");

  const res = await request
    .get("/headers")
    .set("mycustomheader1", "God is great")
    .set("mycustomheader2", "God is lovely")
    .set("mycustomheader3", "God is Guruji");

  console.log(res.statusCode);
  console.log(res.body); //this api simply returns the set request headers as body
});

it("Setting multiple headers- way 2", async () => {
  const request = supertest("https://postman-echo.com");

  const res = await request.get("/headers").set({
    "Content-Type": "application/json",
    Accept: "*/*",
    mycustomheader1: "God is great",
    mycustomheader2: "God is lovely",
    mycustomheader3: "God is Guruji",
  });

  console.log(res.statusCode);
  console.log(res.body); //this api simply returns the set request headers as body
});

//! As a best practice "Headers should be set before the payload is sent."
it("Post request with mandatory headers", async () => {
  const request = supertest("https://dummyapi.io/data/v1");

  const payload = {
    lastName: "Rehmania",
    firstName: "Ankushi",
    email: faker.internet.email(),
  };

  const res = await request
    .post("/user/create")
    .set("app-id", "6654d3379e80c9f9f2c5bb39")
    .send(payload);

  console.log(res.statusCode);
  console.log(res.body); //this api simply returns the set request headers as body
});
