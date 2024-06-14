import supertest from "supertest";
import Joi from "joi";

/*
 * ===================================================================
 * Here in this example we will take a dummy API's POST request.
 * We will hit the request and make all possible assertions on all response attributes:
 * - response status etc.
 * - respnse body
 * - headers
 *============================================================
 */

//! ⚡️ expected response data:

// {
//   "id": 123,
//   "name": "Sample Item",
//   "categories": [
//       "Category1",
//       "Category2",
//       "Category3"
//   ],
//   "tags": [
//       "Tag1",
//       "Tag2",
//       "Tag3"
//   ],
//   "details": {
//       "description": "This is a sample item.",
//       "price": 19.99,
//       "inStock": true
//   },
//   "reviews": [
//       {
//           "user": "user1",
//           "rating": 4.5,
//           "comment": "Great product!"
//       },
//       {
//           "user": "user2",
//           "rating": 3,
//           "comment": "Average quality."
//       }
//   ]
// }

//!⚡️ expected response headers:
// {
//   "Host": "www.example.com",
//   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
//   "Accept-Language": "en-US,en;q=0.5",
//   "Accept-Encoding": "gzip, deflate, br",
//   "Connection": "keep-alive",
//   "Upgrade-Insecure-Requests": "1",
//   "Referer": "https://www.example.com/previous-page",
//   "Cookie": "sessionId=abc123xyz; userId=78910; preferences=darkMode%3Dtrue%26fontSize%3Dmedium",
//   "Cache-Control": "max-age=0"
// }

//! ⚡️ Expected response code : 200

type sampleData = {
  id: number;
  name: string;
  categories?: string[] | null;
  tags?: string[] | null;
  details: Details;
  reviews?: ReviewsEntity[] | null;
};
export interface Details {
  description: string;
  price: number;
  inStock: boolean;
}
export interface ReviewsEntity {
  user: string;
  rating: number;
  comment: string;
}

it("1. Assertion handbook - using 'expect' of Jest", async () => {
  const request = supertest(
    "https://run.mocky.io/v3/0712335c-d7be-45ef-b653-1b265d8b4fbc",
  ); //baseURL
  const res = await request.get("");

  //!☄️☄️ WRITING ASSERTIONS FOR STATUS CODE☄️☄️

  expect(res.statusCode).toBe(200);
  expect(res.type).toEqual("application/json");
  expect(res.ok).toBeTruthy();

  //!☄️☄️ WRITING ASSERTIONS FOR RESPONSE BODY☄️☄️

  const responseBody: sampleData = res.body;

  expect(Object.keys(responseBody)).toEqual(
    expect.arrayContaining([
      "id",
      "name",
      "categories",
      "tags",
      "details",
      "reviews",
    ]),
  );

  expect(responseBody.id).toBe(123);
  expect(responseBody.name).toStrictEqual("Sample Item");
  expect(responseBody.details).toStrictEqual({
    description: "This is a sample item.",
    price: 19.99,
    inStock: true,
  });
  expect(responseBody.categories).toStrictEqual([
    "Category1",
    "Category2",
    "Category3",
  ]);
  expect(responseBody.categories).toHaveLength(3);
  expect(responseBody.categories).toContain("Category2");
  expect(responseBody.details).toHaveProperty("price");
  expect(responseBody.reviews).toContainEqual({
    user: "user2",
    rating: 3.0,
    comment: "Average quality.",
  });

  const review = responseBody.reviews?.[1];
  expect(review).toHaveProperty("comment");

  if (review) {
    expect(Object.keys(review)).toEqual(
      expect.arrayContaining(["rating", "comment", "user"]),
    );
  }

  //!☄️☄️ WRITING ASSERTIONS FOR RESPONSE HEADERS☄️☄️

  const responseHeaders = res.headers;

  expect(responseHeaders.connection).toStrictEqual("keep-alive");

  //extract different cookie attributes
  const responseCookie: string = responseHeaders.cookie;

  const cookieProperties = responseCookie
    .split(";")
    .map(values => values.split("=")[0].trim());

  expect(cookieProperties).toEqual(
    expect.arrayContaining(["sessionId", "userId", "preferences"]),
  );
});

it("2. Schema Assertion - using 'expect' of Jest", async () => {
  const request = supertest(
    "https://run.mocky.io/v3/0712335c-d7be-45ef-b653-1b265d8b4fbc",
  ); //baseURL
  const res = await request.get("");

  //!☄️☄️ WRITING ASSERTIONS FOR STATUS CODE☄️☄️

  expect(res.statusCode).toBe(200);
  expect(res.type).toEqual("application/json");
  expect(res.ok).toBeTruthy();

  //!☄️☄️ WRITING ASSERTIONS FOR RESPONSE BODY SCHEMA☄️☄️

  const responseBody: sampleData = res.body;

  expect(responseBody).toStrictEqual({
    id: expect.any(Number),
    name: expect.any(String),
    categories: expect.arrayContaining([expect.any(String)]), //! Here "expect.objectContaining(<data>)" will also pass because Array is also an Object.
    //! But recommended way is always - expect.arrayContaining(<data>)
    tags: expect.arrayContaining([expect.any(String)]),
    details: {
      description: expect.any(String),
      price: expect.any(Number),
      inStock: expect.any(Boolean),
    },
    reviews: expect.arrayContaining([
      expect.objectContaining({
        user: expect.any(String),
        rating: expect.any(Number),
        comment: expect.any(String),
      }),
    ]),
  });
});

it("3. Schema Assertion - using Joi Library", async () => {
  const request = supertest(
    "https://run.mocky.io/v3/0712335c-d7be-45ef-b653-1b265d8b4fbc",
  ); //baseURL
  const res = await request.get("");

  //!☄️☄️ WRITING ASSERTIONS FOR STATUS CODE☄️☄️

  expect(res.statusCode).toBe(200);
  expect(res.type).toEqual("application/json");
  expect(res.ok).toBeTruthy();

  //!☄️☄️ WRITING ASSERTIONS FOR RESPONSE BODY SCHEMA☄️☄️

  const responseBody: sampleData = res.body;

  //!🐾🐾 STEP 1: Create schema 🐾🐾
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    categories: Joi.array().items(Joi.string()).required(),
    tags: Joi.array().items(Joi.string()).required(),
    details: Joi.object({
      description: Joi.string().required(),
      price: Joi.number().required(),
      inStock: Joi.boolean().required(),
    }).required(),
    reviews: Joi.array()
      .items(
        Joi.object({
          user: Joi.string().required(),
          rating: Joi.number().required(),
          comment: Joi.string().required(),
        }),
      )
      .required(),
  });

  //!🐾🐾 STEP 2: VALIDATE SCHEMA🐾🐾

  const validationResult = schema.validate(responseBody);
  expect(validationResult.error).toBeFalsy();
});

it("4. Difference between .toEqual() vs .toEqual(expect.ArrayContaining() to compare Arrays)", () => {
  const sampleData = ["_id", "name"];

  //! .toEqual(['name', '_id']) or .toStrictEqual()
  //* Strict Equality: This checks that the array you are testing matches exactly the array ['name', '_id'] in terms of both content and order.
  //* Benefit: This is useful when you want to ensure that the array is exactly as expected, with no additional elements and in the specified order.

  //expect(sampleData).toEqual(['_id','name']) //pass - exact match
  //expect(sampleData).toEqual(['name']) //fail - missing '_id' in Array to be tested
  //expect(sampleData).toEqual(['name','_id']) //fail - changed order

  //! .toEqual(expect.arrayContaining(['name', '_id']))
  //* Partial Match: This checks that the ARRAY YOU ARE TESTING CONTAINS AT LEAST THE ELEMENTS IN ANY ORDER, but it can also contain other elements.
  //* Benefit: This is useful when you want to verify that certain elements are present in the array, regardless of their order and the presence of other elements. It provides more flexibility in your tests.

  expect(sampleData).toEqual(expect.arrayContaining(["_id", "name"])); //pass - exact match
  expect(sampleData).toEqual(expect.arrayContaining(["name"])); //pass - Array to be tested contains extra elements-no problem
  expect(sampleData).toEqual(expect.arrayContaining(["name", "_id"])); //pass - changed order - no problem
  // expect(sampleData).toEqual(
  //   expect.arrayContaining(["_id", "name", "address"])
  // ); //fail - Array to be tested does not contain 'address'
});
