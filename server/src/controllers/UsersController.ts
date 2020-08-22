import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import HttpStatus from "http-status-codes";

export async function create(request: Request, response: Response) {
  try {
    const { email, name } = request.body;
    const user = new User(email, name);
    await getRepository(User).save(user);
    const data = { user: user.toJson() };
    response.status(HttpStatus.CREATED).json(data);
  } catch (error) {
    response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getAll(request: Request, response: Response) {
  try {
    const users = await getRepository(User).find();
    const usersData = users.map((user) => user.toJson());
    response.status(HttpStatus.OK).json({ user: usersData });
  } catch (error) {
    response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function update(request: Request, response: Response) {
  try {
    const userId = Number(request.params.id);
    const user = await getRepository(User).findOneOrFail(userId);
    const { email, name } = request.body;
    user.name = name;
    user.email = email;
    await getRepository(User).save(user);
    response.sendStatus(HttpStatus.OK);
  } catch (error) {
    response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function discard(request: Request, response: Response) {
  try {
    const userId = Number(request.params.id);
    await getRepository(User).delete(userId);
    response.sendStatus(HttpStatus.OK);
  } catch (error) {
    response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
