import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/register-actions'

class Logout extends Component {
       
    render() {
        this.props.logout();
        this.props.history.push("/");
        return (
            <div></div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (payload) => dispatch(logout(payload)),
    }
};

export default connect(undefined, mapDispatchToProps)(Logout);