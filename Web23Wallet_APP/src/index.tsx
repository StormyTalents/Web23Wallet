import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import App from "./App";

import { ContextProvider } from "./utility/context";

import i18n from "./i18n";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
