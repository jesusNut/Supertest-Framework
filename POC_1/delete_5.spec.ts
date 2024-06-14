import supertest from "supertest";

//! Remaining concepts are same as in Post.

it("1 DELETE: Delete a post", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com"); //baseURL

  const res = await request.delete("/posts/1");

  console.log(res.request.url);
  console.log(res.status);
  console.log(res.body);
});
