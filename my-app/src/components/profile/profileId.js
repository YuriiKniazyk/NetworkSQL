import React, { Component } from 'react';
import DefaultOptionen from '../../helpers/defaultOptions'

class ProfileId extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: +props.match.params.id,
            name: '',
            surname: '',
        };

        fetch('http://localhost:3300/user/' + this.state.id, {
            headers: DefaultOptionen.headers,
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            this.setState({id: data.accessUser.id, name: data.accessUser.name, surname: data.accessUser.surname});
        });

    }

    render() {
       
        return (
            <div>
               profile
               {this.state.id}, {this.state.name}, {this.state.surname}
            </div>
        )
    }

}

export default ProfileId;