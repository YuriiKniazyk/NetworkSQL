import React, { Component } from 'react';
import defaultOptionenWithOutAuth from '../../helpers/requestHeader/defaultOptionenWithOutAuth';
import { connect } from 'react-redux';
import { forgotePassword } from '../../actions/register-actions';

class ForgotePassword extends Component {
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

        fetch('http://localhost:3300/login/user/forgotpassword', {
            headers: defaultOptionenWithOutAuth.headers,
            method: 'POST',
            body: JSON.stringify({ email: this.state.email })
        })
        .then(response => response.json())
        .then(data => {
            this.props.forgotePassword(data);

            if(this.props.succses === false) {
                alert('Please verify your email!!!');
            }

            if(this.props.succses === true){
                alert('We send email to ' + this.state.email);
                this.props.history.push("/setpassword");
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
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
 
const mapStateToProps = ({email, succses}) => {
    return {
        email,
        succses
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotePassword: (payload) => dispatch(forgotePassword(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotePassword);
