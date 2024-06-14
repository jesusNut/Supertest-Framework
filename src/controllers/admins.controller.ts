import supertest from "supertest";
import { Env } from "@config/env";

const request = supertest(Env.BASE_URL); //baseURL

class AdminsController {
  postAdminLogin(data: object) {
    return request
      .post("/admin/login")
      .send(data)
      .set("Content-Type", "application/x-www-form-urlencoded");
  }
}

export default new AdminsController();
