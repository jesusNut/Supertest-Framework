import { Response } from "supertest";
import { getRandomNumber, getAdminAccessToken } from "@utils/common";
import categoriesController from "@controllers/categories.controller";

let token: string;

//!**************** 🦉 FETCHING TOKEN FOR ADMIN ACCOUNT 🦉 *******************

beforeAll(async () => {
  token = await getAdminAccessToken();
  console.log(`Token is - ${token}`);
});

describe("CREATE A CATEGORY", () => {
  describe("POST/categories - positive scenario", () => {
    let categoryID: string;
    let postResponse: Response;
    const categoryName = `Umbrella-${getRandomNumber()}`;

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
    it("POST/categories - should be having correct response in created category", () => {
      console.log(postResponse.body);
      expect(postResponse.statusCode).toBe(200);
      expect(postResponse.body.name).toEqual(categoryName);
      expect(Object.keys(postResponse.body)).toEqual(
        expect.arrayContaining(["_id", "name", "__v"]),
      );
    });
  });
});
