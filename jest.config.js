
/** @type {import('ts-jest').JestConfigWithTsJest} */
const { config } = require("dotenv");
const { join } = require("path");


//*  *********************** Function to get the current date and time formatted as YYYY-MM-DD_HH-MM-SS ***********************
const getFormattedDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

//************************** HANDLE ENVIRONMENT FILES **********************/

const ENV = process.env.NODE_ENV;
console.log("Value is" + ENV);

const setEnvironment = () => {
  let path;

  //!👉  Jest automatically sets NODE_ENV to 'test' when it runs.
  //!👉 This is a built-in behavior of Jest to ensure that your tests are run in a test environment.

  if (ENV === "test") {
    path = join(__dirname, "src", "config", ".env");
    console.log(`******* RUNNING USING ENV FILE PLACED @ : ${path}`);
  } else if (ENV === "qa" || ENV === "uat") {
    path = join(__dirname, "src", "config", `.env.${ENV}`);
    console.log(
      `******* RUNNING USING ENV FILE USING ENVIRONMENT ${ENV} PLACED @  : ${path}`
    );
  } else {
    throw new Error(
      "******* Please provide a valid environment -> 'qa' or 'uat' ONLY !!! *******"
    );
  }
  config({ path });
};

setEnvironment();

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 10000,
  //mapped to paths in tsconfig.json
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@tests/(.*)$": "<rootDir>/src/tests/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@testdata/(.*)$": "<rootDir>/src/data/$1"
  },
  reporters: [
    'default',  
    ['jest-html-reporters',
      {
        publicPath: './test-results',
        filename: `report_${getFormattedDateTime()}.html`,
        expand: true
      }
    ]
  ]
};
