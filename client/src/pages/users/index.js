import React, {Component} from "react";
import './Users.css';
import AuthService from "../../services/authService";

class Users extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleIsAdmin = this.handleIsAdmin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: {
                username: '',
                password: '',
                isAdmin: true
            },
            usersList: []
        }
    }

    handleUsername(e) {
        e.preventDefault();
        let value = e.target.value;
        this.setState(prevState => (
            {user: {...prevState.user, username: value}}
        ));
    }

    handlePassword(e) {
        e.preventDefault();
        let value = e.target.value;
        this.setState(prevState => (
            {user: {...prevState.user, password: value}}
        ));
    }

    handleIsAdmin(e) {
        this.setState(prevState => (
            {user: {...prevState.user, isAdmin: !prevState.user.isAdmin}}
        ));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.saveUser();
    }

    getUsers = async () => {
        try {
            const response = await fetch("/api/users/getUsers", {
                headers: {
                    'x-access-token': this.Auth.getToken()
                }
            });
            const result = await response.json();
    
            if (response.status !== 200) throw Error('Error');
    
            this.setState({ usersList: result.users });
        } catch (error) {
        }
    }

    saveUser = async () => {
        const response = await fetch('/api/users/addUser', {
            method: 'POST',
            body: JSON.stringify({user: this.state.user}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.Auth.getToken()
            }
        });
        const result = await response.json();

        if (!result.success) throw Error();

        this.setState((prevState, prevProps) => ({
            user: {
                username: '', 
                password: '', 
                isAdmin: false
            }
        }));

        this.setState(prevState => ({ usersList: [...prevState.usersList, result.newUser] }));
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className="users-page">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" 
                        onChange={this.handleUsername} 
                        value={this.state.user.username}/>
                    <br/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" 
                        onChange={this.handlePassword} 
                        value={this.state.user.password}/>
                    <br/>

                    <input type="checkbox" id="isadmin" 
                        checked={this.state.user.isAdmin}
                        onChange={this.handleIsAdmin} />
                    <label htmlFor="isadmin">Is admin?</label>
                    <br/>

                    <button type="submit">Save</button>
                </form>

                {
                    this.state.usersList.map(user => {
                        return <li key={user._id}>{user.username} - {user.isAdmin ? 'Is Admin' : 'Not Admin'}</li>;
                    })
                }
            </div>
        )
    }
}

export default Users;