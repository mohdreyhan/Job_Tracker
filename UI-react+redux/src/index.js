import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store/Store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App store={store} />, document.getElementById("root"));

serviceWorker.unregister();
