import request from "supertest";
import HttpStatus from "http-status-codes";
import { ApiServer } from "../server";
import { Fixtures, synchronize } from "./fixtures";
import { UserPutData, UserData } from "users";
import { internet } from "faker";

let server: ApiServer;
const fixtures = new Fixtures();

beforeAll(async () => {
  server = new ApiServer();
  await server.initialize();
  await synchronize(server);
});

afterAll(async () => {
  await server.close();
});

const generateRandomUserData: () => UserPutData = () => {
  const faker = fixtures.faker;
  return {
    name: faker.name.firstName().toString(),
    email: faker.internet.email().toString(),
  };
};

describe("GET /users", () => {
  it("should allow get all user records", async () => {
    const response = await request(server.server)
      .get(`${fixtures.api}/users`)
      .send();
    expect(response.status).toEqual(HttpStatus.OK);
  });
});

describe("POST /users", () => {
  it("should allow a user record to be created", async () => {
    const userData = generateRandomUserData();
    const response = await request(server.server)
      .post(`${fixtures.api}/users`)
      .send(userData);
    const { user } = response.body;
    expect(response.status).toEqual(HttpStatus.CREATED);
    expect(userData.name).toEqual(user.name);
    expect(userData.email).toEqual(user.email);
  });

  it("should not allow a user record to be created with no details", async () => {
    const response = await request(server.server)
      .post(`${fixtures.api}/users`)
      .send();
    const { user } = response.body;
    expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});

describe("PUT /users/:id", () => {
  it("should update the specified user record", async () => {
    const beforeAllUsersResponse = await request(server.server).get(
      `${fixtures.api}/users`
    );
    const userToBeUpdated = beforeAllUsersResponse.body.users[0];
    const userData = generateRandomUserData();
    const response = await request(server.server)
      .put(`${fixtures.api}/users/${userToBeUpdated.id}`)
      .send(userData);
    const allUsersResponse = await request(server.server).get(
      `${fixtures.api}/users`
    );
    const { users } = allUsersResponse.body;
    const user = users.find((u: UserData) => u.id === userToBeUpdated.id);
    expect(response.status).toEqual(HttpStatus.OK);
    expect(userData.name).toEqual(user.name);
    expect(userData.email).toEqual(user.email);
  });

  it("should not update non-existent user record", async () => {
    const userData = generateRandomUserData();
    const response = await request(server.server)
      .put(`${fixtures.api}/users/${-1}`)
      .send(userData);
    expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR + 1);
  });
});

describe("DELETE /users/:id", () => {
  it("should allow a user record to be deleted", async () => {
    const beforeAllUsersResponse = await request(server.server).get(
      `${fixtures.api}/users`
    );
    const userToBeDeleted = beforeAllUsersResponse.body.users[0];
    const response = await request(server.server)
      .delete(`${fixtures.api}/users/${userToBeDeleted.id}`)
      .send();
    expect(response.status).toEqual(HttpStatus.OK);

    const allUsersResponse = await request(server.server).get(
      `${fixtures.api}/users`
    );
    const { users } = allUsersResponse.body;
    const user = users.find((u: UserData) => u.id === userToBeDeleted.id);
    expect(user).toEqual(undefined);
  });
});
