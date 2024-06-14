import { Response } from "supertest";
import { getRandomNumber } from "@utils/common";
import controller from "@controllers/brand.controller";

describe("CREATE A BRAND", () => {
  describe("POST/brands", () => {
    let postResponse: Response;
    const brandName = `APPLE IPHONE-${getRandomNumber()}`;
    const brandDesc = `APPLE IPHONE PRO M3 CHIP`;

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
    it("POST/brands - should be having correct response in created brand", () => {
      expect(postResponse.statusCode).toBe(200);
      expect(postResponse.body.name).toEqual(brandName);
      expect(postResponse.body.description).toEqual(brandDesc);
      expect(postResponse.body).toHaveProperty("createdAt");
    });

    it("POST/brands - should not be able to create duplicate brand enteries", async () => {
      const duplicateResponse = await controller.postBrand({
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
