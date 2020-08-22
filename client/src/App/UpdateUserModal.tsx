import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import React, { useState } from "react";
import UserForm from "./UserForm";
import { UserData } from "../types/users";

interface Props {
  user: UserData;
  render: any;
}

const UpdateUserModal: React.FC<Props> = ({ render, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleVisibility = () => setIsOpen(!isOpen);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={toggleVisibility}
        aria-labelledby="customized-dialog-title"
      >
        <DialogContent>
          <UserForm
            isCreating={false}
            user={user}
            onSubmit={toggleVisibility}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={toggleVisibility}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {render(toggleVisibility)}
    </>
  );
};

export default UpdateUserModal;
