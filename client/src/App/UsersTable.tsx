import React from "react";
import MUIDataTable from "mui-datatables";
import useUsers from "./UsersContext";

import { UserData } from "../types/users";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UpdateUserModal from "./UpdateUserModal";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const EMPTY_STR = "";

const UsersTable: React.FC = () => {
  const classes = useStyles();
  const { users, deleteUser } = useUsers();

  const columns = [
    {
      label: "ID",
      name: "id",
      options: {
        sort: true,
      },
    },
    {
      label: "Name",
      name: "name",
      options: {
        sort: true,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        sort: true,
      },
    },
    {
      label: "Actions",
      name: "actions",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const { rowIndex, columnIndex } = tableMeta;
          const userId = Number(data[rowIndex][columnIndex]);
          const user = users.find((user) => user.id === userId);
          if (!user) {
            return <div />;
          }
          return (
            <>
              <UpdateUserModal
                user={user}
                render={(toggleModal: () => void) => (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={toggleModal}
                  >
                    Update
                  </Button>
                )}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => deleteUser(userId)}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    },
  ];

  const data = users.map((user: UserData) => {
    const { id, name, email } = user;
    return [id, name, email, id];
  });

  const searchFunc = (searchQuery: string, currentRow: any[], _: any[]) => {
    const userId = currentRow[0];
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return false;
    }
    const { name, email } = user;
    const lowerCaseSearchText = searchQuery.toLowerCase();
    return (
      searchQuery === EMPTY_STR ||
      name.toLowerCase().includes(lowerCaseSearchText) ||
      email.toLowerCase().includes(lowerCaseSearchText)
    );
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <MUIDataTable
        title={`Users - ${users.length} script(s) in total`}
        data={data}
        columns={columns}
        options={{
          customSearch: searchFunc,
          download: false,
          filter: false,
          print: false,
          selectableRows: "none",
        }}
      />
    </Container>
  );
};

export default UsersTable;
