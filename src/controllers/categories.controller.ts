import supertest from "supertest";
import { Env } from "@config/env";

const request = supertest(Env.BASE_URL); //baseURL

class CategoriesController {
  getAllCategories() {
    return request.get(`/categories`);
  }

  getCategoriesByID(id: string) {
    return request.get("/categories/" + id);
  }

  postCategory(data: object, token: string) {
    return request
      .post("/categories")
      .send(data)
      .set("Authorization", "Bearer " + token);
  }

  putCategory(id: string, data: object, token: string) {
    return request
      .put("/categories/" + id)
      .send(data)
      .set("Authorization", "Bearer " + token);
  }

  deleteCategory(id: string, token: string) {
    return request
      .delete("/categories/" + id)
      .set("Authorization", "Bearer " + token);
  }
}

export default new CategoriesController();
