import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../../redux/store/configureStore";
import HomePage from "./HomePage/HomePage";

// Semantic Ui
import "semantic-ui-css/semantic.min.css";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import { checkUsersAuthState } from "../../redux/actions/auth/auth";
import Verify from "./Auth/Verify/Verify";

import "semantic-ui-css/semantic.min.css";
import Navbar from "../common/Navbar/Navbar";
import ErrorPage from "./404Page/404Page";
import ForgetPassword from "./Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./Auth/ResetPassword/ResetPassword";
import GetVerifyEmail from "./Auth/GetVerifyEmail/GetVerifyEmail";

// REDUX STAFF
const store = configureStore;

// CHECK USER LOGGED IN OR NOT
store.dispatch(checkUsersAuthState());

const App = ({ location }) => {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch key={location.key}>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/forgetPassword" component={ForgetPassword} exact />
        <Route path="/resetPassword/:token" component={ResetPassword} exact />
        <Route path="/getVerifyEmail" component={GetVerifyEmail} exact />
        <Route path="/verify/:token" component={Verify} exact />
        <Route path="/" component={HomePage} exact />
        <Route path="*" component={ErrorPage} exact />
      </Switch>
    </Provider>
  );
};

export default withRouter(App);
