import React, { Component, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import AuthProvider from './auth/AuthProvider'
import PrivateRoute from "./components/PrivateRouter";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ContextProvider } from "./contexts/Context";
import "./scss/style.scss";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Modal from "./components/commons/modal";
import Loading from "./components/commons/Loading";
import RenewalPage from "./views/renewalPage";
import Checkout from "./views/renewalPage/Checkout";
import RenewalRoute from "./components/RenewalRoute";
import MedicineDonation from "./views/medicineDonation/MedicineDonation";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));

// Pages
const Home = lazy(() => import("./views/home/Home"));
const Login = lazy(() => import("./views/pages/login/Login"));
const Register = lazy(() => import("./views/pages/register/Register"));
const Page404 = lazy(() => import("./views/pages/page404/Page404"));
const Page500 = lazy(() => import("./views/pages/Unauthorised/Unauthorised"));

const App = () => {
  return (
    <ContextProvider>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        {/*  */}
        <Toaster />
        <Modal />
        {/*  <Loading /> */}
        {/*  */}
        <Router>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route
                exact
                path="/"
                name="Home"
                render={(props) => <Home {...props} />}
              />
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/renewal"
                name="Renewal Page"
                render={(props) => <RenewalPage {...props} />}
              />
              <Route
                exact
                path="/medicine-donation"
                name="Medicine Donation"
                render={(props) => <MedicineDonation {...props} />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <Route
                exact
                path="/unauthorised"
                name="Not Authorised"
                render={(props) => <Page500 {...props} />}
              />
              <RenewalRoute
                path="/Checkout"
                name="Checkout"
                render={(props) => <Checkout {...props} />}
              />
              <PrivateRoute
                path="/"
                name="Account"
                render={(props) => <DefaultLayout {...props} />}
              />
              <Route
                exact
                path="*"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
            </Switch>
          </React.Suspense>
        </Router>
      </LocalizationProvider>
    </ContextProvider>
  );
};

export default App;
