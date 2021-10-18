import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import globalTheme from "./components/Theme.js";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={globalTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
