import { Response } from "supertest";
import { getRandomNumber, getAdminAccessToken } from "@utils/common";
import categoriesController from "@controllers/categories.controller";

let token: string;

//!**************** 🦉 FETCHING TOKEN FOR ADMIN ACCOUNT 🦉 *******************

beforeAll(async () => {
  token = await getAdminAccessToken();
  console.log(`Token is - ${token}`);
});

describe("UPDATE A CATEGORY", () => {
  describe("PUT/categories/{id} - Positive Scenario", () => {
    let categoryID: string;
    let postResponse: Response;
    const categoryName = `EVM-${getRandomNumber()}`;

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
    it("PUT/categories/{id} - should be able to update the brand name", async () => {
      const putResponse = await categoriesController.putCategory(
        categoryID,
        {
          name: categoryName + "-UPDATED",
        },
        token,
      );
      console.log(putResponse.body);
      expect(putResponse.statusCode).toBe(200);
      expect(putResponse.body.name).toEqual(categoryName + "-UPDATED");
    });
  });

  describe("PUT/categories/{id} - Negative Tests ", () => {
    //!******** 🦉 CREATING THE CATEGORY HERE BEFORE STARTING ANY TEST INSIDE THIS DESCRIBE.🦉 ***********

    let categoryID: string;
    let postResponse: Response;
    const categoryName = `EVM-${getRandomNumber()}`;

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
    it("PUT/categories/{id} - Maximum length of brand name should not be more than 30", async () => {
      const brandNameWithMoreThan30Chars =
        "pneumonoultramicroscopicsilicokolcha" + getRandomNumber();

      //updating entry to check char length of name field is 30

      const putResponse = await categoriesController.putCategory(
        categoryID,
        {
          name: brandNameWithMoreThan30Chars,
        },
        token,
      );

      expect(putResponse.statusCode).toBe(422);
      expect(putResponse.body.error).toEqual(`Brand name is too long`);
    });
  });
});
