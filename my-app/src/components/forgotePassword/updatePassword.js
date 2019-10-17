import React, { Component } from 'react';
import defaultOptionenWithOutAuth from '../../helpers/requestHeader/defaultOptionenWithOutAuth';
import { connect } from 'react-redux';
import { updatePassword } from '../../actions/register-actions';

class UpdataPassword extends Component {
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

        fetch('http://localhost:3300/login/user/forgotchangepassword', {
            headers: defaultOptionenWithOutAuth.headers,
            method: 'PUT',
            body: JSON.stringify({ email: this.state.email, password: this.state.password, passwordVerify: this.state.passwordVerify, forgotecodes: this.state.forgotecodes })
        })
        .then(response => response.json())
        .then(data => {

            this.props.updatePassword(data);
            if(this.props.msg === 'WHERE parameter "forgotecodes" has invalid "undefined" value'){
                //alert('Please enter codes!'); 
                return (
                    <div>Erro</div>
                )
            }

            if(this.props.msg === 'User is not register!!!!') {
                alert('Please cheked your data!');
            }

            if(this.props.msg === 'Wrong password or passwordVerify') {
                alert('Wrong password or passwordVerify. Please cheked your password!!');
            }
            
            if(this.props.succses === true) {
                this.props.history.push("/login");
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:
                        <input type="email" name="email" onChange={this.handleChange} />
                    </label>
                    <label>Password:
                        <input type="password" name="password" onChange={this.handleChange} />
                    </label>
                    <label>Verify password:
                        <input type="password" name="passwordVerify" onChange={this.handleChange} />
                    </label>
                    <label>Enter your codes:
                        <input type="text" name="forgotecodes" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
 
const mapStateToProps = ({email, succses, forgotecodes, passwordVerify, msg}) => {
    return {
        email,
        forgotecodes,
        succses,
        msg,
        passwordVerify
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (payload) => dispatch(updatePassword(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdataPassword);