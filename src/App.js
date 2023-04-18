import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";
import LayoutAdmin from "./containers/layout/Layout";
import { PublicRoutes, PrivateRoutes, PharmacyRoutes } from "./configs/Router";
import { PATH } from "./constants/common";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <LayoutAdmin>
            <div>
              <Spinner size={20} />
            </div>
          </LayoutAdmin>
        }
      >
        <LayoutAdmin>
          <Switch>
            {PublicRoutes}
            {PrivateRoutes}
            {PharmacyRoutes}
            <Redirect to={PATH.USER} />
          </Switch>
        </LayoutAdmin>
      </Suspense>
    </Router>
  );
};

export default App;
