//********************** ☔️ OBJECTIVE ☔️ *******************

//* 1. We will get data sets from an external file JSON file and then try to create brands using different data sets.
//* 2. After creating data sets and asserting it we will delete all created Brands.

//! HOW TO GET UNIQUE TEST CASE NAME WHILE USING Test.each() or it.each() of Jest?
//? https://stackoverflow.com/questions/56800074/jest-each-name-access-object-key
//? https://jestjs.io/docs/api#testeachtablename-fn-timeout [MODERN AND PREFFERED WAY AFTER JEST VERSION 27]

//***********************************************************

import supertest from "supertest";
import data from "./testdata.json";
import { getRandomNumber } from "@src/utils/common";

const request = supertest("https://practice-react.sdetunicorns.com/api/test");

describe("Data Driven Tests - using it.each or test.each of Jest", () => {
  let generatedBrandID: string;

  afterEach(async () => {
    console.log(`Deleteing Brand with ID as ${generatedBrandID}`);
    const res = await request.delete("/brands/" + generatedBrandID);
    expect(res.statusCode).toBe(200);
  });
  it.each(data)("POST /brands - $name", async data => {
    const nameOfBrand = data.name + getRandomNumber();
    const res = await request.post("/brands").send({
      name: nameOfBrand,
      description: data.description,
    });
    generatedBrandID = res.body._id;
    console.log(
      `Created Brand with name ${nameOfBrand} having ID as ${generatedBrandID}`,
    );
    expect(res.statusCode).toBe(200);
  });
});
