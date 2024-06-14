import adminsController from "../controllers/admins.controller";
import { Env } from "../config/env";

type JsonObject = { [key: string]: any };

export function replaceJSONPlaceholders(
  json: JsonObject,
  replacements: (string | number)[],
): JsonObject {
  // Clone the input JSON to avoid mutating the original object
  const result = JSON.parse(JSON.stringify(json));

  // Recursively replace placeholders
  function replace(obj: JsonObject) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        // Check if the string is a placeholder like "{0}", "{1}", etc.
        const match = obj[key].match(/{(\d+)}/);
        if (match) {
          const index = parseInt(match[1], 10);
          if (index < replacements.length) {
            obj[key] = replacements[index];
          }
        }
      } else if (typeof obj[key] === "number") {
        // Convert number to string to check for placeholders
        const match = obj[key].toString().match(/{(\d+)}/);
        if (match) {
          const index = parseInt(match[1], 10);
          if (index < replacements.length) {
            obj[key] = replacements[index];
          }
        }
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        // Recursively replace placeholders in nested objects
        replace(obj[key]);
      }
    }
  }

  replace(result);
  return result;
}

export function getRandomNumber(): number {
  return Math.floor(Math.random() * (50000 - 10 + 1)) + 100;
}

export async function getAdminAccessToken(): Promise<string> {
  const adminLoginResponse = await adminsController.postAdminLogin({
    email: Env.EMAIL,
    password: Env.PASSWORD,
  });
  return adminLoginResponse.body.token;
}
