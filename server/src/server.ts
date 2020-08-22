import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import express from "express";
import { Server } from "http";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import ormconfig from "../ormconfig";
import routes from "./routes";

const corsOptions: CorsOptions = {
  origin: process.env.NODE_ENV === "production" ? "http://example.com" : "*",
};

export class ApiServer {
  public connection: Connection | null = null;
  public server: Server | null = null;

  async initialize(port: number = 3001) {
    this.connection = await createConnection(ormconfig);
    await this.connection.synchronize();
    console.log("connected to port ", port);

    const app = express();
    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use("/", routes);
    this.server = app.listen(port);
  }

  async close() {
    this.connection && (await this.connection.close());
    this.server && this.server.close();
  }
}

export default ApiServer;