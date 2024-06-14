import { Response } from "supertest";
import { getRandomNumber } from "@utils/common";
import controller from "@controllers/brand.controller";

describe("UPDATE A BRAND", () => {
  describe("PUT/brands/{id} - Positive tests", () => {
    let postResponse: Response;
    const brandName = `DELL INSPIRON-${getRandomNumber()}`;
    const brandDesc = `DELL INSPIRON HX CHIP`;

    //!******** 🦉 CREATING THE BRAND HERE BEFORE STARTING ANY TEST INSIDE THIS DESCRIBE.🦉 ***********
    beforeAll(async () => {
      postResponse = await controller.postBrand({
        name: brandName,
        description: brandDesc,
      });
      expect(postResponse.statusCode).toBe(200);
      console.log("Brand ID in before all - " + postResponse.body._id);
    });

    //!******** 🦉 DELETEING THE BRAND AFTER COMPLETION OF ALL TESTS INSIDE THIS DESCRIBE🦉 ***********
    afterAll(async () => {
      console.log("Brand ID in after all - " + postResponse.body._id);
      const deleteResponse = await controller.deleteBrand(
        postResponse.body._id,
      );
      expect(deleteResponse.statusCode).toBe(200);
    });

    //!************************************ 🦉 WRITE TESTS🦉 *****************************************

    it("PUT/brands/{id} - should be able to update the brand name", async () => {
      const putResponse = await controller.putBrand(postResponse.body._id, {
        name: brandName + "-UPDATED",
        description: brandDesc,
      });
      expect(putResponse.statusCode).toBe(200);
      expect(putResponse.body.name).toEqual(brandName + "-UPDATED");
      expect(putResponse.body.description).toEqual(brandDesc);
      expect(putResponse.body).toHaveProperty("updatedAt");
    });

    it("PUT/brands/{id} - should be able to update the brand description", async () => {
      const putResponse = await controller.putBrand(postResponse.body._id, {
        name: brandName + "-UPDATED",
        description: brandDesc + "-UPDATED",
      });
      expect(putResponse.statusCode).toBe(200);
      expect(putResponse.body.name).toEqual(brandName + "-UPDATED");
      expect(putResponse.body.description).toEqual(brandDesc + "-UPDATED");
      expect(putResponse.body).toHaveProperty("updatedAt");
    });
  });

  describe("PUT/brands/{id} - Negative Tests ", () => {
    let postResponse: Response;
    const brandName = `DELL INSPIRON-${getRandomNumber()}`;
    const brandDesc = `DELL INSPIRON HX CHIP`;

    //!******** 🦉 CREATING THE BRAND HERE BEFORE STARTING ANY TEST INSIDE THIS DESCRIBE.🦉 ***********
    beforeAll(async () => {
      postResponse = await controller.postBrand({
        name: brandName,
        description: brandDesc,
      });
      expect(postResponse.statusCode).toBe(200);
      console.log("Brand ID in before all - " + postResponse.body._id);
    });

    //!******** 🦉 DELETEING THE BRAND AFTER COMPLETION OF ALL TESTS INSIDE THIS DESCRIBE🦉 ***********
    afterAll(async () => {
      console.log("Brand ID in after all - " + postResponse.body._id);
      const deleteResponse = await controller.deleteBrand(
        postResponse.body._id,
      );
      expect(deleteResponse.statusCode).toBe(200);
    });
    //!************************************ 🦉 WRITE TESTS🦉 *****************************************
    it("PUT/brands/{id} - Maximum length of brand name should not be more than 30", async () => {
      const brandNameWithMoreThan30Chars =
        "pneumonoultramicroscopicsilicovolca" + getRandomNumber();

      //updating entry to check char length of name field is 30

      const UpdatedRes = await controller.putBrand(postResponse.body._id, {
        name: brandNameWithMoreThan30Chars,
        description: brandDesc,
      });
      expect(UpdatedRes.statusCode).toBe(422);
      expect(UpdatedRes.body.error).toEqual(`Brand name is too long`);
    });

    it("PUT/brands/{id} - should have brand description as string only", async () => {
      //updating entry to check char length of name field is 30

      const UpdatedRes = await controller.putBrand(postResponse.body._id, {
        name: brandName,
        description: 1234,
      });
      expect(UpdatedRes.statusCode).toBe(422);
      expect(UpdatedRes.body.error).toEqual(
        `Brand description must be a string`,
      );
    });
  });
});
