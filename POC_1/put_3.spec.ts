import supertest from "supertest";

//! Remaining concepts are same as in Post.

it("1 PUT: Update a post", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com"); //baseURL

  const res = await request
    .put("/posts/1")
    .send({
      title: "foocia",
      body: "bartender",
      userId: 1000,
    })
    .set({
      "content-type": "application/json; charset=utf-8",
      "modified-by": "Abhigunda",
    });

  console.log(res.request.url);
  console.log(res.status);
  console.log(res.body);
});
