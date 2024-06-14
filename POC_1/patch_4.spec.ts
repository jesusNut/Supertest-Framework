import supertest from "supertest";

//! Remaining concepts are same as in Post.

it("1 PATCH: Partially Update a post", async () => {
  const request = supertest("https://jsonplaceholder.typicode.com"); //baseURL

  const res = await request
    .patch("/posts/11")
    .send({
      title: "foociapatched",
    })
    .set({
      "content-type": "application/json; charset=utf-8",
      "modified-by": "Abhigunda",
    });

  console.log(res.request.url);
  console.log(res.status);
  console.log(res.body);
});
