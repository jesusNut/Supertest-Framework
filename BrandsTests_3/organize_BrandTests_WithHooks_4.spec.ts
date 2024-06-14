import supertest, { Response } from "supertest";

//! Udemy - Section 10 : Hooks

//* This is to demonstrate writing independent tests using HOOKS.

const request = supertest("https://practice-react.sdetunicorns.com/api/test"); //baseURL

function getRandomNumber(): number {
  return Math.floor(Math.random() * (50000 - 10 + 1)) + 100;
}

describe("FETCH INDIVIDUAL BRAND", () => {
  describe("GET/brands/{id} ", () => {
    let brandID: string;
    const brandName = `APPLE MACBOOK-${getRandomNumber()}`;
    const brandDesc = `APPLE MACBOOK PRO M3 CHIP`;

    //!******** 🦉 CREATING THE BRAND HERE BEFORE STARTING ANY TEST INSIDE THIS DESCRIBE.🦉 ***********
    beforeAll(async () => {
      const res = await request.post("/brands").send({
        name: brandName,
        description: brandDesc,
      });
      expect(res.statusCode).toBe(200);

      //fetch id from the newly created brand
      brandID = res.body._id;
      console.log("Brand ID in before all - " + brandID);
    });

    //!******** 🦉 DELETEING THE BRAND AFTER COMPLETION OF ALL TESTS INSIDE THIS DESCRIBE🦉 ***********

    afterAll(async () => {
      console.log("Brand ID in after all - " + brandID);
      const deleteResponse = await request.delete(`/brands/${brandID}`);
      expect(deleteResponse.statusCode).toBe(200);
    });

    //!************************************ 🦉 WRITE TESTS🦉 *****************************************

    it("GET/brands/{id} - should be able to get the brand attributes", async () => {
      const res = await request.get(`/brands/${brandID}`);

      expect(res.body.name).toStrictEqual(brandName);
      expect(res.body.description).toStrictEqual(brandDesc);
    });

    it("GET/brands/{id} - should be having status code as 200", async () => {
      const res = await request.get(`/brands/${brandID}`);

      expect(res.statusCode).toBe(200);
    });

    it("GET/brands/{id} - Should display error and 404 on invalid id", async () => {
      const res = await request.get(`/brands/aaaaaaaaaaaa`);

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe(`Brand not found.`);
    });
  });
});

describe("CREATE A BRAND", () => {
  describe("POST/brands", () => {
    let postResponse: Response;
    const brandName = `APPLE IPHONE-${getRandomNumber()}`;
    const brandDesc = `APPLE IPHONE PRO M3 CHIP`;

    //!******** 🦉 CREATING THE BRAND HERE BEFORE STARTING ANY TEST INSIDE THIS DESCRIBE.🦉 ***********
    beforeAll(async () => {
      postResponse = await request.post("/brands").send({
        name: brandName,
        description: brandDesc,
      });
      expect(postResponse.statusCode).toBe(200);
      console.log("Brand ID in before all - " + postResponse.body._id);
    });

    //!******** 🦉 DELETEING THE BRAND AFTER COMPLETION OF ALL TESTS INSIDE THIS DESCRIBE🦉 ***********
    afterAll(async () => {
      console.log("Brand ID in after all - " + postResponse.body._id);
      postResponse = await request.delete(`/brands/${postResponse.body._id}`);
      expect(postResponse.statusCode).toBe(200);
    });

    //!************************************ 🦉 WRITE TESTS🦉 *****************************************
    it("POST/brands - should be having correct response in created brand", () => {
      expect(postResponse.statusCode).toBe(200);
      expect(postResponse.body.name).toEqual(brandName);
      expect(postResponse.body.description).toEqual(brandDesc);
      expect(postResponse.body).toHaveProperty("createdAt");
    });

    it("POST/brands - should not be able to create duplicate brand enteries", async () => {
      const duplicateResponse = await request.post("/brands").send({
        name: brandName,
        description: brandDesc,
      });
      expect(duplicateResponse.statusCode).toBe(422);
      expect(duplicateResponse.body.error).toEqual(
        `${brandName} already exists`,
      );
    });
  });
});
