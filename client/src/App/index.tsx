import { StylesProvider } from "@material-ui/styles";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { UsersProvider } from "./UsersContext";
import HomePage from "./UserPage";

toast.configure();

const ActiveApp: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <UsersProvider>
        <HomePage />
      </UsersProvider>
    </React.Suspense>
  );
};

const App: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <ActiveApp />
    </StylesProvider>
  );
};

export default App;
