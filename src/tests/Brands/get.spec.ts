import { getRandomNumber } from "@utils/common";
import controller from "@controllers/brand.controller";

describe("FETCH INDIVIDUAL BRAND", () => {
  describe("GET/brands/{id} ", () => {
    let brandID: string;
    const brandName = `APPLE MACBOOK-${getRandomNumber()}`;
    const brandDesc = `APPLE MACBOOK PRO M3 CHIP`;

    //!******** 🦉 CREATING THE BRAND HERE BEFORE STARTING ANY TEST INSIDE THIS DESCRIBE.🦉 ***********
    beforeAll(async () => {
      const res = await controller.postBrand({
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
      const deleteResponse = await controller.deleteBrand(brandID);
      expect(deleteResponse.statusCode).toBe(200);
    });

    //!************************************ 🦉 WRITE TESTS🦉 *****************************************

    it("GET/brands/{id} - should be able to get the brand attributes", async () => {
      const res = await controller.getBrandByID(brandID);

      expect(res.body.name).toStrictEqual(brandName);
      expect(res.body.description).toStrictEqual(brandDesc);
    });

    it("GET/brands/{id} - should be having status code as 200", async () => {
      const res = await controller.getBrandByID(brandID);
      expect(res.statusCode).toBe(200);
    });

    it("GET/brands/{id} - Should display error and 404 on invalid id", async () => {
      const res = await controller.getBrandByID("aaaaaaaaaaaaaaaaaaaaaaaa");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe(`Brand not found.`);
    });
  });
});
