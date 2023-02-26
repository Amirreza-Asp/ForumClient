import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./layout/App";
import "react-toastify/dist/ReactToastify.min.css";
import "@sweetalert2/themes/dark/dark.css";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router history={history}>
    <App />
  </Router>
);
