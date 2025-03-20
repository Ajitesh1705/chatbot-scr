import "styles/utils.css";
import "styles/globalStyle.css";

import App from "App";
import { UIControllerProvider } from "context";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <UIControllerProvider>
        <App />
      </UIControllerProvider>
    </Provider>
  </BrowserRouter>
);
