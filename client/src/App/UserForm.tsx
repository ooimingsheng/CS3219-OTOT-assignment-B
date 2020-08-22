import React, { useState } from "react";
import useUsers from "./UsersContext";

import { UserData } from "../types/users";
import {
  Container,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import red from "@material-ui/core/colors/red";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface OwnProps {
  isCreating: boolean;
  onSubmit?: () => void;
  user?: UserData;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    red: {
      color: red[500],
    },
    container: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const UserForm: React.FC<OwnProps> = ({ isCreating, user, onSubmit }) => {
  const classes = useStyles();
  const { createUser, updateUser } = useUsers();

  const initialData = user
    ? {
        name: user.name,
        email: user.email,
      }
    : { name: "", email: "" };

  const [values, setValues] = useState<{ name: string; email: string }>(
    initialData
  );

  const handleSubmit = () => {
    if (user && !isCreating) {
      updateUser(user.id, values);
    } else {
      createUser(values);
    }
    setValues(initialData);
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Typography>{isCreating ? "Create new" : "Update"} user</Typography>

      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item style={{ flexGrow: 1 }}>
          <TextField
            key={1}
            value={values.name}
            onChange={(event) => {
              const name = event.target.value;
              setValues({ ...values, name });
            }}
            variant="filled"
            margin="dense"
            label="Name"
            fullWidth
          />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <TextField
            key={2}
            value={values.email}
            onChange={(event) => {
              const email = event.target.value;
              setValues({ ...values, email });
            }}
            variant="filled"
            margin="dense"
            label="Email"
            fullWidth
          />
        </Grid>
        <Grid item>
          <Tooltip title="Create user">
            <IconButton onClick={handleSubmit} color="primary">
              <DoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton
              onClick={() => setValues(initialData)}
              className={classes.red}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserForm;
