import cors, { CorsOptions } from "cors";
import express from "express";
import { Server } from "http";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import ormconfig from "../ormconfig";
import routes from "./routes";

const corsOptions: CorsOptions = {
  origin: "*",
};

export class ApiServer {
  public connection: Connection | null = null;
  public server: Server | null = null;

  async initialize(port: number = 3001) {
    this.connection = await createConnection(ormconfig);

    const app = express();
    app.use("/", routes);
    app.use(cors(corsOptions));
    this.server = app.listen(port);

    await this.connection.query("CREATE EXTENSION IF NOT EXISTS tablefunc;");
  }

  async close() {
    this.connection && (await this.connection.close());
    this.server && this.server.close();
  }
}

export default ApiServer;
