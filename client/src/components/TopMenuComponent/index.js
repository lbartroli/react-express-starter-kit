import React, {Component} from "react";
import { NavLink } from "react-router-dom";
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
                        <NavLink exact={true} to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/topics">Topics</NavLink>
                    </li>
                </ul>
                <div className="user-info-wrapper">
                    <span>You are logged in as <strong>{this.state.profile ? this.state.profile.username : 'Anonimus'}</strong> | </span>
                    <a onClick={this.handleLogout.bind(this)}>Logout</a>
                </div>
            </div>
        )
    }
}

export default AuthWrapper(TopMenuComponent);
