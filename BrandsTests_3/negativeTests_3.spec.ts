import supertest from "supertest";

//! Udemy - Section 9 : Negative Testing

const request = supertest("https://practice-react.sdetunicorns.com/api/test"); //baseURL

function getRandomNumber(): number {
  return Math.floor(Math.random() * (50000 - 10 + 1)) + 100;
}

it("POST/brands - name field is mandatory ", async () => {
  const res = await request.post("/brands").send({
    name: "",
    description: "any random data",
  });

  expect(res.body.error).toStrictEqual("Name is required");
  expect(res.statusCode).toBe(422);
});

//for this API, minimum char length for name field is - 2
it("POST/brands - name field minimum char validation ", async () => {
  const res = await request.post("/brands").send({
    name: "a",
    description: "any random data",
  });

  expect(res.body.error).toStrictEqual("Brand name is too short");
  expect(res.statusCode).toBe(422);
});

it("POST/brands - Should not allow duplicate Brand enteries ", async () => {
  const brandName = "Azhar-" + getRandomNumber();
  //first entry
  const res = await request.post("/brands").send({
    name: brandName,
    description: "any random data",
  });
  expect(res.statusCode).toBe(200);
  //duplicate entry
  const duplicateRes = await request.post("/brands").send({
    name: brandName,
    description: "any random data",
  });
  expect(duplicateRes.statusCode).toBe(422);
  console.log(duplicateRes.body.error);
  expect(duplicateRes.body.error).toEqual(`${brandName} already exists`);
});

it("GET/brands/invalidID - Should throw 404 ", async () => {
  const res = await request.get("/brands/aaaaaaaaaaaa");
  expect(res.statusCode).toBe(404);
  expect(res.body.error).toEqual(`Brand not found.`);
});

it("PUT/brands/ID - Maximum length of brand name is 30", async () => {
  const brandNameWhileUpdating =
    "Electroencephalographically" + getRandomNumber();
  const brandNameWhileCreating = "Electro" + getRandomNumber();

  //create entry
  const res = await request.post("/brands").send({
    name: brandNameWhileCreating,
    description: "any random data",
  });
  //expect(res.statusCode).toBe(200);

  //fetch id of the brand
  const brandID = res.body._id;

  //updating entry to check char length of name field is 30

  const UpdatedRes = await request.put(`/brands/${brandID}`).send({
    name: brandNameWhileUpdating,
    description: "any random data",
  });
  expect(UpdatedRes.statusCode).toBe(422);
  expect(UpdatedRes.body.error).toEqual(`Brand name is too long`);

  //updating entry to verify brand description must be a string

  // const UpdatedRes2 = await request.put(`/brands/${brandID}`).send({
  //   name: brandName.substring(0, 7),
  //   description: 123456,
  // });
  // expect(UpdatedRes2.statusCode).toBe(422);
  // expect(UpdatedRes2.body.error).toEqual(`Brand description must be a string`);
});

it("PUT/brands/ID - should have brand description as string only", async () => {
  const brandNameWhileCreating = "Posted" + getRandomNumber();

  console.log(`Brand name while creating is : ${brandNameWhileCreating}`);
  //create entry
  const res = await request.post("/brands").send({
    name: brandNameWhileCreating,
    description: "any random data",
  });
  expect(res.statusCode).toBe(200);

  //fetch id of the brand
  const brandID = res.body._id;

  //updating entry to verify brand description must be a string
  const UpdatedRes = await request.put(`/brands/${brandID}`).send({
    name: brandNameWhileCreating,
    description: 1234,
  });

  expect(UpdatedRes.statusCode).toBe(422);
  expect(UpdatedRes.body.error).toEqual(`Brand description must be a string`);
});

it("DELETE/brands - Should Throw error while deleting invalid brand", async () => {
  const res = await request.delete("/brands/aaaaaaaaaaaaa");
  expect(res.statusCode).toBe(422);
  expect(res.body.error).toContain("Unable to delete brand");
});
