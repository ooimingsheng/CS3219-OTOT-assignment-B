import { ConnectionOptions } from "typeorm";

const POSTGRES_USERNAME = "postgres";
const POSTGRES_PASSWORD = "postgres";
const POSTGRES_HOST = "localhost";
const POSTGRES_PORT = "5432";
const POSTGRES_NAME = "CS3219";
const POSTGRES_DISABLE_SSL = true;

export const postgres: ConnectionOptions = {
  type: "postgres",
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_NAME,
  ssl: !POSTGRES_DISABLE_SSL,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/src/models/**/*.js`, "src/models/**/*.ts"],
  migrations: [`${__dirname}/src/migrations/**/*.js`, "src/migrations/**/*.ts"],
  subscribers: [
    `${__dirname}/src/subscribers/**/*.js`,
    "src/subscribers/**/*.ts"
  ],
  cli: {
    entitiesDir: `${__dirname}/src/entities`,
    migrationsDir: `${__dirname}/src/migrations`,
    subscribersDir: `${__dirname}/src/subscribers`
  },
  migrationsRun: true
};

export default postgres;