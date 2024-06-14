import supertest from "supertest";

it("1 GET: simple get request - Get all posts", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com/posts"); //baseURL
  const res = await request.get("");
  console.log(res.body);
});

it("2 GET: get request with query param - WAY 1 - get all posts of user with userId=2", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com/posts");
  const res = await request.get("?userId=2&limit=5"); //limiting no.of posts to <number> is not supported by server. Used just for demo purpose.
  console.log(res.body);
  console.log(res.request.url);
});

it("3 GET: get request with query param - WAY 2- get all posts of user with userId=1", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com");
  //const res = await request.get("").query("userId=1"); //this is one way to write if you have only one query param
  const res = await request.get("/posts").query({ userId: 1, limit: 5 }); //this is other way to write if you have one or more query param.
  console.log(res.body);
  console.log(res.request.url);
});

it("4 GET: get request with path param - get the post Id number 15", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com");
  const res = await request.get("/posts/15"); //this is how we can write any number of path params
  console.log(res.body);
  console.log(res.request.url);
});
