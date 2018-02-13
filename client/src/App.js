import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import TopMenuComponent from "./components/TopMenuComponent";
import Home from "./pages/home";
import About from "./pages/about";
import Topics from "./pages/topics";
import Users from "./pages/users";


const App = ({history}) => (
    <div>
        <TopMenuComponent history={history} />
        <Container>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/users" component={Users} />
                <Route path="/about/:number" component={Test} />
                <Redirect from="/sarasa" to="/"/>
                <Route path="/topics" component={Topics} />
                <Route component={Home}/>
            </Switch>
        </Container>
    </div>
);

const Container = ({children}) => (
    <div className="container">{children}</div>
)

const Test = ({match}) => (
    <div>
        <h1>You selected {match.params.number}</h1>
    </div>
)

export default App;