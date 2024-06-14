import supertest from "supertest";
import { Env } from "@config/env";

const request = supertest(Env.BASE_URL); //baseURL

class BrandController {
  getAllBrands() {
    return request.get("/brands");
  }

  getBrandByID(id: string) {
    return request.get("/brands/" + id);
  }

  postBrand(data: object) {
    return request.post("/brands").send(data);
  }

  putBrand(id: string, data: object) {
    return request.put("/brands/" + id).send(data);
  }

  deleteBrand(id: string) {
    return request.delete("/brands/" + id);
  }
}

export default new BrandController();
