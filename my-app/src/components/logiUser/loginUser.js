import React, { Component } from 'react';
import defaultOptionenWithOutAuth from '../../helpers/defaultOptionenWithOutAuth';

class LoginUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:3300/login/user', {
            headers: defaultOptionenWithOutAuth.headers,
            method: 'POST',
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('accessToken', data.token.accessToken);
                localStorage.setItem('tokenType', data.token.type);
                this.props.history.push("/profile");
            });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <label>Password:
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div >
        )
    }

}

export default LoginUser;