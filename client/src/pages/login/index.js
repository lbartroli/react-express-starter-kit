import React, {Component} from "react";
import './Login.css';
import AuthService from "../../services/authService";
import Input from "../../components/InputComponent";

class Login extends Component {
    constructor() {
        super();
        this.auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(e){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    handleLogin = async (e) => {
        e.preventDefault();
        let success = await this.auth.login(this.state.username, this.state.password);
        if (success) this.props.history.replace('/');
    }

    componentWillMount() {
        if(this.auth.isLoggedIn())
            this.props.history.replace('/');
    }

    render() {
        return (
            <div className="login-page">
                <form onSubmit={this.handleLogin}>
                    <Input 
                        id="username"
                        label="Username:"
                        name="username"
                        placeholder='Username'
                        type="text"
                        autofocus={true}
                        classes={['sarasa1', 'sarasa2']}
                        value={this.state.username}
                        action={this.handleChange} />
                    <Input 
                        id="password"
                        label="Password:"
                        name="password"
                        placeholder="Password"
                        type="password"
                        classes={['sarasa3', 'sarasa4']}
                        value={this.state.password}
                        action={this.handleChange} />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;