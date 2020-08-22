import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const UsersPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container}>
      <UserForm isCreating={true} />
      <UsersTable />
    </Container>
  );
};

export default UsersPage;
