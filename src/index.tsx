import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import AppRedux from "./AppRedux";

ReactDOM.render(
  <Provider store={store}>
    {/* <App /> */}
    <AppRedux />
  </Provider>,
  document.getElementById("root")
);
