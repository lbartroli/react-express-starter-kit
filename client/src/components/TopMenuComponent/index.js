import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./TopMenu.css";
import AuthService from '../../services/authService';
import AuthWrapper from '../authWrapper';


class TopMenuComponent extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.state = {
            profile: null
        }
    }

    handleLogout() {
        this.Auth.logout();
        this.props.history.replace('/login');
    }

    componentDidMount() {
        let profile = this.Auth.getProfile();
        this.setState({profile: profile});
    }

    render() {
        return (
            <div className="top-menu-component">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                        <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
                <div className="user-info-wrapper">
                    <span>You are logged in as {this.state.profile ? this.state.profile.username : 'Anonimus'} </span>
                    <a onClick={this.handleLogout.bind(this)}>Logout</a>
                </div>
            </div>
        )
    }
}

export default AuthWrapper(TopMenuComponent);
