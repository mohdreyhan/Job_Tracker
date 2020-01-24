import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { HashRouter, BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/login/Login.js";
import Dashboard from "./components/dashboard/Dashboard";
import NavbarPage from "./components/navbar/NavbarPage";
import Index from "./components/manager/exceltojson/index";
import TaskDetails from "./components/manager/managetasks/TaskDetails";

const App = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <NavbarPage />
      {/* <Switch> */}
      <Route exact path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/addtasks" component={Index} />
      <Route path="/managetasks" component={TaskDetails} />
      {/* </Switch> */}
    </HashRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
