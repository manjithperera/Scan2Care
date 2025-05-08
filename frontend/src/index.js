import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";         // <-- import Redux Provider
import store from "./redux/store";             // <-- import the Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>                     {/* <-- wrap Redux Provider here */}
    <GoogleOAuthProvider clientId="353783120916-6p34gs4a2pk19eiatkt3b31osa2kjgej.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
