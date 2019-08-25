import React, { Component } from 'react';
import DefaultOptionen from '../../helpers/defaultOptions'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            surname: '',
            text: '',
            users: []
        };

        fetch('http://localhost:3300/user/profile', {
            headers: DefaultOptionen.headers,
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            this.setState({id: data.accessUser.id, name: data.accessUser.name, surname: data.accessUser.surname});
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:3300/user?name=' + this.state.text, {
            headers: DefaultOptionen.headers,
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(this.state);
            
            this.setState((state) => {

                let oldState = state;
                oldState.users = data.accessUser;
                return oldState;
            });
            console.log(this.state);
            
        });

    };

    static renderUsersList(users) {
        return (
            <ul>  
                {users.map(user =>
                    <li key={user.id}> 
                        <a href={'/userprofile/' + user.id}>{user.name} {user.surname}</a>     
                    </li>
                )}
            </ul>
        );
    }

    render() {
       
        let usersContent = this.state.users.length > 0 ? Profile.renderUsersList(this.state.users) : <div>User not found</div>;

        return (
            <div>
               My profile
               {this.state.id}, {this.state.name}, {this.state.surname}

               <form onSubmit={this.handleSubmit}>
                    <label>Find By Name:
                <input type="text" name="text" value={this.state.text} onChange={this.handleChange} />
                    </label>
                <input type="submit" value="Submit" />
                </form>

                <div >
                    {usersContent} 
                </div>
            </div>
        )
    }

}

export default Profile;