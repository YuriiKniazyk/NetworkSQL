import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultOptionenWithOutAuth from '../../../helpers/requestHeader/defaultOptionenWithOutAuth';
import { register } from '../../../actions/register-actions';

class CreateUser extends Component {

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
        const {name, surname, email, password} = this.state;
        
        fetch('http://localhost:3300/user', {
            headers: defaultOptionenWithOutAuth.headers,
            method: 'POST',
            body: JSON.stringify({ name, surname, email, password })
        })
            .then(response => response.json())
            .then(data => {
                this.props.register(data);   

                if(this.props.msg === 'Validation error') {
                    alert('User with this email is registered!!!!!!! Please enter your email');
                    this.props.history.push("/register");
                }

                if(this.props.msg === 'Some field is empty!') {
                    alert('Some field is empty!');
                }

                if(this.props.succses === true) {
                    this.props.history.push("/login");
                }
            });
    }
    
    render() {
        
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:
                <input type="text" name="name" onChange={this.handleChange} />
                    </label>
                    <label>Surname:
                <input type="text" name="surname" onChange={this.handleChange} />
                    </label>
                    <label>Email:
                <input type="email" name="email"  onChange={this.handleChange} />
                    </label>
                    <label>Password:
                <input type="password" name="password"  onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div >
        )
    }
}

const mapStateToProps = ({succses, msg}) => {
    return {
        succses,
        msg
    }
};

const mapDispatchToProps = (dispatch) => {    
    return {
        register: (payload) => dispatch(register(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);