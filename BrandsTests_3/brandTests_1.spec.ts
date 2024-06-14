import supertest from "supertest";

//! Udemy - Section 6 : Brand Tests

it("1. Should pass GET /brands", async () => {
  const request = supertest("https://practice-react.sdetunicorns.com/api/test"); //baseURL
  const res = await request.get("/brands");

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBeGreaterThan(1);
  expect(Object.keys(res.body[0])).toEqual(
    expect.arrayContaining(["name", "_id"]),
  );
});

it("2. Should pass GET /brands/:id", async () => {
  const request = supertest("https://practice-react.sdetunicorns.com/api/test"); //baseURL
  const res = await request.get("/brands/643af1d0943a82def498012c");

  expect(res.statusCode).toBe(200);
  expect(res.body.name).toEqual("Fit Bit");
});

it("3. Should pass POST /brands", async () => {
  //Generate Random number between 100 and 500
  function getRandomNumber(): number {
    return Math.floor(Math.random() * (5000000 - 100 + 1)) + 100;
  }

  const name = `APPLE MACBOOK-${getRandomNumber()}`;

  const request = supertest("https://practice-react.sdetunicorns.com/api/test"); //baseURL

  const res = await request.post("/brands").send({
    name: name,
    description: "APPLE MACBOOK PRO M3 CHIP",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.name).toEqual(name);
  expect(res.body).toHaveProperty("createdAt");
  console.log(res.body);
});

it("4. Should pass PUT and DELETE /brands/:id", async () => {
  //Generate Random number between 100 and 500
  function getRandomNumber(): number {
    return Math.floor(Math.random() * (500 - 100 + 1)) + 100;
  }

  const name = `APPLE MACBOOK-${getRandomNumber()}`;

  //create/Post a brand
  const request = supertest("https://practice-react.sdetunicorns.com/api/test"); //baseURL
  const res = await request.post("/brands").send({
    name: name,
    description: "APPLE MACBOOK PRO M3 CHIP",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.name).toEqual(name);
  expect(res.body).toHaveProperty("createdAt");
  console.log(res.body);

  //fetch id from the newly created brand
  const brandId = res.body._id;

  //update/Put the brand created above
  const updatedRes = await request.put(`/brands/${brandId}`).send({
    name: name,
    description: "APPLE MACBOOK PRO M3 CHIP-16 Inch",
  });

  console.log(`***** Updated Response Body is : ****** `);
  console.log(updatedRes.body);
  expect(updatedRes.statusCode).toBe(200);
  expect(updatedRes.body.name).toEqual(name);
  expect(updatedRes.body.description).toStrictEqual(
    "APPLE MACBOOK PRO M3 CHIP-16 Inch",
  );

  //delete the brand created and updated above
  const deletedRes = await request.delete(`/brands/${brandId}`);
  expect(deletedRes.statusCode).toBe(200);

  //try to get the deleted brand again , we expect 404 - as the brand is already deleted.
  expect((await request.get(`/brands/${brandId}`)).statusCode).toBe(404);
});
