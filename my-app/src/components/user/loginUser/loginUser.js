import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, authorization } from '../../../actions/register-actions';
import defaultOptionenWithOutAuth from '../../../helpers/requestHeader/defaultOptionenWithOutAuth';

class LoginUser extends Component {

    constructor(props) {
        super(props);        
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
        const { email, password } = this.state;
        this.props.login({ email, password });
        
        fetch('http://localhost:3300/login/user', {
            headers: defaultOptionenWithOutAuth.headers,
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            this.props.authorization(data);

            if(this.props.succses === false) {
                alert('Please verify your password OR email!');
            }

            if(this.props.succses === true) {
                this.props.history.push("/profile");
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:
                <input type="email" name="email" onChange={this.handleChange} />
                    </label>
                    <label>Password:
                <input type="password" name="password" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <a href="/forgotePassword">Forgot password!!!</a>
            </div >
        )
    }

}

const mapStateToProps = (state) => {
    return {
        succses: state.succses,
        msg: state.msg
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload) => dispatch(login(payload)),
        authorization: (payload) => dispatch(authorization(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);