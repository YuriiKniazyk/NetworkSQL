import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileId extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: +props.match.params.id,
        };

        fetch('http://localhost:3300/user/' + this.state.id, {
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.token.type + ' ' + this.props.token.accessToken
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            this.setState({id: data.accessUser.id, name: data.accessUser.name, surname: data.accessUser.surname});
        });

    }

    render() {
       
        return (
            <div>
               Profile {this.state.id}: {this.state.name} {this.state.surname}
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        token: state.token, 
    }
};

export default connect(mapStateToProps, undefined)(ProfileId);