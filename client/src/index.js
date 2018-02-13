import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "typeface-roboto";
import "./index.css";
import App from "./App";
import Login from "./pages/login";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route component={App} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
