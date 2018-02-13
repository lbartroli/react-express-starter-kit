import React, { Component } from "react";
import "./Home.css";
import logo from "../../logo.svg";
import io from "socket.io-client";
import AuthService from "../../services/authService";

class App extends Component {
    constructor() {
        super();
        this.AuthService = new AuthService();
        this.handleAdd = this.handleAdd.bind(this);
        this.handleItemToAddChange = this.handleItemToAddChange.bind(this);
        this.state = {
            response: "",
            itemToAdd: '',
            itemsList: []
        };
    }

    handleItemToAddChange(e) {
        e.preventDefault();
        this.setState({itemToAdd: e.target.value});
    }

    handleAdd(e) {
        e.preventDefault();
        if(this.state.itemToAdd !== '') {
            this.addItemToList();
        }
    }

    componentDidMount() {
        this.socket = io();
        this.socket.on("broadcastItems", this.handleItems.bind(this));
        this.callApi();
    }

    componentWillUnmount() {
        this.socket.off("broadcastItems", this.handleItems);
        this.socket.close();
    }

    handleItems(items) {
        this.setState((prevState, prevProps) => ({
            itemsList: items.list
        }));
    }

    callApi = async () => {
        const response = await fetch("/api/home", {
            headers: {
                'x-access-token': this.AuthService.getToken()
            }
        });
        const result = await response.json();

        if (response.status !== 200) throw Error('Error');

        this.setState({ response: result.message })
    }

    addItemToList = async () => {
        const response = await fetch('/api/home/addItem', {
            method: 'POST',
            body: JSON.stringify({item: this.state.itemToAdd}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.AuthService.getToken()
            }
        });
        const result = await response.json();

        if (!result.success) throw Error();

        this.setState((prevState, prevProps) => ({
            itemToAdd: ''
        }));
    }

    render() {
        return (
            <div className="home-page">
                <header>
                    <img src={logo} alt="logo" />
                    <h1>Welcome to React</h1>
                </header>
                <p>{this.state.response}</p>
                <form onSubmit={this.handleAdd}>
                    <input placeholder="Socket.IO test" onChange={this.handleItemToAddChange} value={this.state.itemToAdd} />
                    <button type="submit">Add</button>
                </form>
                <ul>
                    {this.state.itemsList.map((item, index) => 
                        <li key={index}>{item}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default App;
