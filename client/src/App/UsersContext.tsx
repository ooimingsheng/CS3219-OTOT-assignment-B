import { UserData, UserPostData, UserPutData } from "../types/users";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

interface UserDataProps {
  users: UserData[];
}

interface UserMutationProps {
  createUser: (data: UserPostData) => void;
  updateUser: (userId: number, data: UserPutData) => void;
  deleteUser: (userId: number) => void;
}

type UserContextProps = (UserDataProps & UserMutationProps) | null;

const UsersContext = React.createContext<UserContextProps>(null);

export const UsersProvider: React.FC = (props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserData[]>([]);

  const getUsers = async () => {
    try {
      const { data } = await api.users.getUsers();
      const { users } = data;
      setUsers(users);
    } catch (error) {
      toast.error("An error occured while trying to load the user.");
    }
    setIsLoading(false);
  };

  const refreshUsers = () => getUsers();

  useEffect(() => {
    refreshUsers();
  }, []);

  const createUser = async (data: UserPostData) => {
    try {
      await api.users.createUser(data);
      refreshUsers();
    } catch (error) {
      toast.error("An error occured while trying to create the user.");
    }
  };

  const updateUser = async (userId: number, data: UserPutData) => {
    try {
      await api.users.updateUser(userId, data);
      refreshUsers();
    } catch (error) {
      toast.error("An error occured while trying to update the user.");
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await api.users.deleteUser(userId);
      refreshUsers();
    } catch (error) {
      toast.error("An error occured while trying to update the user.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <UsersContext.Provider
      value={users ? { users, createUser, updateUser, deleteUser } : null}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const users = useContext(UsersContext);
  if (!users) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return users;
};

export default useUsers;
