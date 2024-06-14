import supertest from "supertest";

//! Udemy - Section 8 : Organize Brand Tests

//* This is to demonstrate an end to end test.
//* POST->GET->PUT->DELETE

describe("End to End Test", () => {
  let brandID: string;
  const request = supertest("https://practice-react.sdetunicorns.com/api/test"); //baseURL
  const brandName = `APPLE MACBOOK-${getRandomNumber()}`;
  let brandDesc = `APPLE MACBOOK PRO M3 CHIP`;

  function getRandomNumber(): number {
    return Math.floor(Math.random() * (50000 - 10 + 1)) + 100;
  }

  it("should be able to create a Brand", async () => {
    const res = await request.post("/brands").send({
      name: brandName,
      description: brandDesc,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual(brandName);
    expect(res.body.description).toEqual(brandDesc);
    expect(res.body).toHaveProperty("createdAt");
    console.log(`***** Created Brand : Response Body is : ****** `);
    console.log(res.body);

    //fetch id from the newly created brand
    brandID = res.body._id;
  });
  it("should be able to get the Brand", async () => {
    const res = await request.get(`/brands/${brandID}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toStrictEqual(brandName);
    expect(res.body.description).toStrictEqual(brandDesc);
  });
  it("should be able to update a Brand", async () => {
    //make changes in the brand description
    brandDesc = brandDesc + "-UPDATED";

    const res = await request.put(`/brands/${brandID}`).send({
      name: brandName,
      description: brandDesc,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual(brandName);
    expect(res.body.description).toStrictEqual(brandDesc);
    console.log(`***** Updated Response Body is : ****** `);
    console.log(res.body);
  });
  it("should be able to delete a Brand", async () => {
    const deletedRes = await request.delete(`/brands/${brandID}`);
    expect(deletedRes.statusCode).toBe(200);
  });
  it("should NOT be able to get the Brand after deletion", async () => {
    const res = await request.get(`/brands/${brandID}`);

    expect(res.statusCode).toBe(404);
  });
});
