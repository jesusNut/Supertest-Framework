import { decrypt } from "@utils/CryptojsUtil";
export class Env {
  public static readonly BASE_URL = decrypt(process.env.URL!);
  public static readonly EMAIL = decrypt(process.env.EMAIL!);
  public static readonly PASSWORD = decrypt(process.env.PASSWORD!);
}
