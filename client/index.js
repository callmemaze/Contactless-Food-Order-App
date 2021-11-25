import React from "react";
import { AppRegistry } from "react-native";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import App from "./App";
import { name as appName } from "./app.json";

const store = createStore(reducer, compose(applyMiddleware(thunk)));

const index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => index);
