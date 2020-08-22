import faker from "faker";
import ApiServer from "../server";

faker.seed(127);

export async function synchronize(apiServer: ApiServer) {
  if (!apiServer.connection) {
    throw new Error("Connection failed to initialise");
  }
  await apiServer.connection.synchronize(true);
}

export class Fixtures {
  faker: Faker.FakerStatic;
  api = "/api";

  constructor() {
    this.faker = faker;
  }
}
