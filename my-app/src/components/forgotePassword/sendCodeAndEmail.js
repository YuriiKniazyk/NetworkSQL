import React, { Component } from 'react';
import defaultOptionenWithOutAuth from '../../helpers/requestHeader/defaultOptionenWithOutAuth';
import { connect } from 'react-redux';
import { sendCodeAndEmail } from '../../actions/register-actions';

class SendCodeAndEmail extends Component {
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

        const { email, forgotecodes } = this.state;

        fetch('http://localhost:3300/login/user/verifyemailforgotecodes', {
            headers: defaultOptionenWithOutAuth.headers,
            method: 'POST',
            body: JSON.stringify({ email, forgotecodes })
        })
            .then(response => response.json())
            .then(data => {
            
                this.props.sendCodeAndEmail(data);

                if(this.props.msg === 'Wrong data of user!!!!') {
                    alert('Please verify your data');
                }

                if(this.props.msg === 'Please enter email!!!!') {
                    alert('Please enter email!!!!');
                }

                if(this.props.msg === 'Please enter forgotecodes!!!!') {
                    alert('Please enter forgotecodes!!!!');
                }


                if(this.props.succses === true) {
                    this.props.history.push("/setpasswordandupdate");
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
                    <label>Enter your codes:
                        <input type="text" name="forgotecodes" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
 
const mapStateToProps = ({email, succses, forgotecodes, msg}) => {
    return {
        email,
        forgotecodes,
        succses,
        msg
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendCodeAndEmail: (payload) => dispatch(sendCodeAndEmail(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SendCodeAndEmail);

