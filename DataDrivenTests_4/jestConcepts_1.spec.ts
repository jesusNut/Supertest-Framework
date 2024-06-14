//! 😵😵😵 DATA DRIVEN TESTING USING JEST😵😵😵

//* We can use Describe.each() or it.each() or Test.each() for data driven testing [Same concept applies on all 3 ]
//? https://jestjs.io/docs/api#testeachtablename-fn-timeout [Modern way]

//*==================================================  MODERN WAY  ==================================================

const testData = [
  {
    fname: "RomRom",
    lname: "Fazilpuria",
    address: {
      city: "Moradabad",
      pin: 560086,
    },
    phone: 1234567890,
    food: ["wine", "kohda"],
  },
  {
    fname: "Raft",
    lname: "aar",
    address: {
      city: "Faizabad",
      pin: 560085,
    },
    phone: 987654321,
    food: ["kathar", "old monk"],
  },
];

//* Step 1: Define the test data
//* Step 2: Define a describe block
//* Step 3: Define an it. each(name, function, timeout) block [Timeout is optional]

describe("Mandatory to give describe block", () => {
  // !👉🏼👉🏼 Notice how to access the properties inside the name argument when using back tick  i.e. template literals
  it.each(testData)(
    `${"$fname"} - ${"$lname"} - ${"$address.city"} - ${"$address.pin"} - ${"$phone"} - ${"$food"}"}`,
    testData => {
      //! 👉🏼👉🏼 Notice how to access the properties inside the function
      console.log(testData);
      console.log(testData.fname);
      console.log(testData.lname);
      console.log(testData.address.city);
      console.log(testData.address.pin);
      console.log(testData.phone);
      console.log(testData.food[0]);
      console.log(testData.food[1]);
    },
    10000,
  );

  //! 👉🏼👉🏼 Notice how to access the properties inside the name argument when NOT using back tick  i.e. template literals
  it.each(testData)(
    "$fname---$lname---$address.city---$address.pin----$phone---$food",
    testData => {
      //! Notice how to access the properties inside the function
      console.log(testData);
      console.log(testData.fname);
      console.log(testData.lname);
      console.log(testData.address.city);
      console.log(testData.address.pin);
      console.log(testData.phone);
      console.log(testData.food[0]);
      console.log(testData.food[1]);
    },
    10000,
  );
});

//*==================================================  TRADITIONAL WAY  ==================================================

testData.forEach(testData => {
  it(testData.fname, () => {
    console.log(testData);
    console.log(testData.fname);
    console.log(testData.lname);
    console.log(testData.address.city);
    console.log(testData.address.pin);
    console.log(testData.phone);
    console.log(testData.food[0]);
    console.log(testData.food[1]);
  });
});
