import supertest from "supertest";
import postData from "./createpost.json";
import dynamicPostData from "./createpost_dynamic.json";
import { faker } from "@faker-js/faker";
import { replaceJSONPlaceholders } from "../src/utils/common";

it("1 POST: Create a post using static request body + assertions", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com"); //baseURL

  const res = await request.post("/posts").send({
    title: "fook",
    body: "bahara",
    userId: 102,
  });

  console.log(res.request.url);
  console.log(res.status);
  console.log(res.body);
  expect(res.statusCode).toBe(201);
});

it("2 POST: Create a post using static JSON file + assertions", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com"); //baseURL

  const res = await request.post("/posts").send(postData);
  console.log(res.request.url);
  console.log(res.status);
  console.log(res.body);
  expect(res.statusCode).toBe(201);
});

it("3 POST: Create a post using DYNAMIC request body + assertions", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com"); //baseURL

  const res = await request.post("/posts").send({
    title: faker.lorem.word(8),
    body: faker.lorem.lines(1),
    userId: Math.floor(Math.random() * (300 - 200 + 1)) + 200,
  });

  console.log(res.request.url);
  console.log(res.status);
  console.log(res.body);
  expect(res.statusCode).toBe(201);
});

it("4 POST: Create a post using DYNAMIC JSON file + assertions", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com"); //baseURL

  const title = faker.lorem.word(5);
  const body = faker.lorem.lines(1);
  const userId = Math.floor(Math.random() * (300 - 200 + 1)) + 200;

  const res = await request
    .post("/posts")
    .send(replaceJSONPlaceholders(dynamicPostData, [title, body, userId]));

  console.log(res.request.url);
  console.log(res.status);
  console.log(res.body);
  expect(res.statusCode).toBe(201);
});
