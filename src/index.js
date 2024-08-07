import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/style.scss";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store"; //Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
