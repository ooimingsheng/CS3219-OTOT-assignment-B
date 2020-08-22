import { AxiosResponse } from "axios";
import { UserData, UserPostData, UserPutData } from "../types/users";
import client from "./client";

const URL = "/users";

export async function createUser(data: UserPostData): Promise<AxiosResponse> {
  return client.post(`${URL}`, data);
}

export async function getUsers(): Promise<
  AxiosResponse<{ users: UserData[] }>
> {
  return client.get(`${URL}`);
}

export async function updateUser(
  userId: number,
  userData: UserPutData
): Promise<AxiosResponse> {
  return client.put(`${URL}/${userId}`, userData);
}

export async function deleteUser(userId: number): Promise<AxiosResponse> {
  return client.delete(`${URL}/${userId}`);
}
