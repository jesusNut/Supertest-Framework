import { Response } from "supertest";
import { getRandomNumber, getAdminAccessToken } from "@utils/common";
import categoriesController from "@controllers/categories.controller";

let token: string;

//!**************** 🦉 FETCHING TOKEN FOR ADMIN ACCOUNT 🦉 *******************

beforeAll(async () => {
  token = await getAdminAccessToken();
  console.log(`Token is - ${token}`);
});

describe("FETCH ALL CATEGORIES", () => {
  describe("GET/categories", () => {
    //!************************************ 🦉 WRITE TESTS🦉 *****************************************

    it("GET/categories - should be able to have more than 1 category", async () => {
      const res = await categoriesController.getAllCategories();
      expect(res.body.length).toBeGreaterThan(1);
      expect(res.statusCode).toBe(200);
    });
    it("GET/categories - should have _id and name property", async () => {
      const res = await categoriesController.getAllCategories();
      expect(res.body[0]).toHaveProperty("_id");
      expect(res.body[0]).toHaveProperty("name");
    });
  });
});

describe("FETCH INDIVIDUAL CATEGORY", () => {
  describe("GET/categories/{id} ", () => {
    let categoryID: string;
    let postResponse: Response;
    const categoryName = `BubbleGum-${getRandomNumber()}`;

    //!******** 🦉 CREATING THE CATEGORY HERE BEFORE STARTING ANY TEST INSIDE THIS DESCRIBE.🦉 ***********

    beforeAll(async () => {
      postResponse = await categoriesController.postCategory(
        {
          name: categoryName,
        },
        token,
      );

      //fetch category ID from the newly created category
      categoryID = postResponse.body._id;
      console.log("Category ID in before all - " + categoryID);
    });

    //!******** 🦉 DELETING THE CATEGORY AFTER COMPLETION OF ALL TESTS INSIDE THIS DESCRIBE🦉 ***********
    afterAll(async () => {
      console.log("Category ID in after all - " + categoryID);
      const deleteResponse = await categoriesController.deleteCategory(
        categoryID,
        token,
      );
      expect(deleteResponse.statusCode).toBe(200);
    });

    //!************************************ 🦉 WRITE TESTS🦉 *****************************************

    it("GET/categories/{id} - should be able to get the category attributes", async () => {
      const res = await categoriesController.getCategoriesByID(categoryID);
      console.log(res.body);
      expect(res.body.name).toStrictEqual(categoryName);
      expect(res.body._id).toBeTruthy();
    });

    it("GET/brands/{id} - should be having status code as 200", async () => {
      const res = await categoriesController.getCategoriesByID(categoryID);
      expect(res.statusCode).toBe(200);
    });

    it("GET/brands/{id} - Should display error and 404 on invalid id", async () => {
      const res = await categoriesController.getCategoriesByID(
        "0000cbb1111188d4dce48cdf",
      );
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe(`Category not found.`);
    });
  });
});
