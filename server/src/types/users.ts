export interface UserPostData {
  email: string;
  name: string;
}

export type UserPutData = UserPostData;

export interface UserData {
  id: number;
  email: string;
  name: string;
}
