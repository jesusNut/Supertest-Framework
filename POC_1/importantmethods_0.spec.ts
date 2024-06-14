/* eslint-disable @typescript-eslint/no-floating-promises */
import supertest from "supertest";
import _ from "lodash";

//!==========================================================================================================================

//* 👉👉👉 There are two ways to write any test in Supertest-jest.

//* ✨ 1. Using async await - In this approach, we should never use end() or done() callback methods.
//* ✨ 2. Without Using async await - In this approach, we should use end() or done() callback methods.

//* 👉👉👉 When using async/await with Supertest, you should avoid using the .end() method directly.
//*          The await keyword automatically waits for the request to complete and resolves the promise, which internally calls .end().
//*          Therefore, mixing async/await with .end() can lead to issues like ".end() being called twice".
//* 👉👉👉 When using async/await with Supertest, you should avoid using the .end() method and even done() method.

//* 🪐 USAGE OF end() method -> Ends the request and invokes the provided callback function with the error (first args) and response(2nd args).

//* 🪐 USAGE of done() method -> Provides explicit control over asynchronous operations & call done() to indicate successful completion or done(err) to indicate failure.

//!==========================================================================================================================

it("1. First way of writing tests in Jest-Supertest using async-await :: expect(callback) + expect method of Jest", async () => {
  const request = supertest("https://reqres.in"); //baseURL
  await request.get("/api/users/2").expect(res => {
    expect(res.body.data).toHaveProperty("id", 2);
    expect(res.body.data).toHaveProperty("first_name", "Janet");
    expect(res.body.data).toHaveProperty("last_name", "Weaver");
    expect(res.body.data).toHaveProperty("email", "janet.weaver@reqres.in");
    expect(res.body.data).toHaveProperty(
      "avatar",
      "https://reqres.in/img/faces/2-image.jpg",
    );
    expect(res.statusCode).toBe(200);
  });
});

it("2 . Second way of writing tests in Jest-Supertest W/O using async-await :: expect(callback) + expect method of Jest + end() + done()", done => {
  const request = supertest("https://reqres.in"); //baseURL
  request
    .get("/api/users/2")
    .expect(res => {
      expect(res.body.data).toHaveProperty("id", 2);
      expect(res.body.data).toHaveProperty("first_name", "Janet");
      expect(res.body.data).toHaveProperty("last_name", "Weaver");
      expect(res.body.data).toHaveProperty("email", "janet.weaver@reqres.in");
      expect(res.body.data).toHaveProperty(
        "avatar",
        "https://reqres.in/img/faces/2-image.jpg",
      );
      expect(res.statusCode).toBe(200);
    })
    .end((err, res) => {
      if (err) {
        throw new Error(`******** Assertion failed *********** :: ${err}`);
        done(err);
      } else {
        console.log("Assertion passed with status code", res.statusCode);
        console.log(res.body);
        done();
      }
    });
});

it("4. Important methods of Response", async () => {
  const request = supertest("https://restful-booker.herokuapp.com"); //baseURL
  const res = await request
    .post("/booking")
    .set({ accept: "*/*" })
    .send({
      firstname: "Abhishek",
      lastname: "Madan",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-04-07",
        checkout: "2024-05-15",
      },
      additionalneeds: "Dinner",
    });

  //!👉 PRINT THE RESPONSE ATTRIBUTES
  console.log("🚀 ~ res.status:", res.status); //200
  console.log("🚀 ~ res.statusType:", res.statusType); //2 which indicates the status code is within 200 range which means the request was successful.
  console.log("🚀 ~ res.statusCode:", res.statusCode); //200

  console.log("🚀 ~ res.type:", res.type); //application/json
  console.log("🚀 ~ res.charset:", res.charset); //utf-8

  console.log("🚀 ~ res.info:", res.info); //false - True if the status code is 1xx (informational).
  console.log("🚀 ~ res.ok:", res.ok); //true - True if the status code is 2xx (successful).
  console.log("🚀 ~ res.redirect:", res.redirect); //false - True if the status code is 3xx (redirection).
  console.log("🚀 ~ res.clientError :", res.clientError); //false - True if the status code is 4xx (client error).
  console.log("🚀 ~ res.serverError:", res.serverError); //false - True if the status code is 5xx (server error).
  console.log("🚀 ~ res.error:", res.error); //false - HTTPS ERROR text if the status code is 4xx or 5xx (client or server error).

  console.log("🚀 ~ res.accepted:", res.accepted); //false - True if the status code is 202 (accepted).
  console.log("🚀 ~ res.noContent:", res.noContent); //false - True only if the status code is 204 (no content).
  console.log("🚀 ~ res.badRequest:", res.badRequest); //false - True only if the status code is 400 (bad request).
  console.log("🚀 ~ res.unauthorized :", res.unauthorized); //false - True if the status code is 401 (unauthorized).
  console.log("🚀 ~ res.forbidden:", res.forbidden); //false - True if the status code is 403 (forbidden).
  console.log("🚀 ~ res.notFound:", res.notFound); //false - True if the status code is 404 (not found).
  console.log("🚀 ~ res.notAcceptable:", res.notAcceptable); //false - True only  if the status code is 406 (not acceptable).

  //!👉 PRINT THE RESPONSE BODY
  console.log(`-----------------------------------------------------`);
  console.log(res.body);
  console.log(`-----------------------------------------------------`);
  console.log(res.text);
  console.log(`-----------------------------------------------------`);

  //!👉 PRINT THE HEADERS
  console.log(res.headers);
  //console.log(res.header); // res.header is an alias for res.headers.
});

it("5. Important methods of Request - expect() usage", async () => {
  const request = supertest("https://reqres.in"); //baseURL
  await request
    .get("/api/users/2")
    .expect(200) //!👉 check status code (without callback)
    .expect("Content-Type", /json/); //!👉 check header directly (without callback)
});

it("6. Important methods of Request - expect(callback) + lodash usage", async () => {
  const request = supertest("https://reqres.in"); //baseURL
  await request.get("/api/users/2").expect(res => {
    const expectedBody = {
      data: {
        last_name: "Weaver",
        first_name: "Janet",
        email: "janet.weaver@reqres.in",
        id: 2,
        avatar: "https://reqres.in/img/faces/2-image.jpg",
      },
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    };

    //!👉 writing assertion for deep comparison using lodash
    if (!_.isEqual(res.body, expectedBody)) {
      throw new Error(
        `**** Verification failed for response body *** :: Expected \n ${JSON.stringify(
          expectedBody,
        )} \n BUT GOT :: \n ${JSON.stringify(res.body)}`,
      );
    }

    //!👉 assertion for status code
    if (res.statusCode !== 200) {
      throw new Error(
        ` **** Verification failed for status code :: Expected 200 but got ${res.statusCode}`,
      );
    }
  });
});
