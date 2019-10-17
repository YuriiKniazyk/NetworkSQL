import React, { Component } from 'react';
import { connect } from 'react-redux';
import { profile } from '../../../actions/register-actions'

class Profile extends Component {

    constructor(props) {
        super(props);
   
        fetch('http://localhost:3300/user/profile', {
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.token.type + ' ' + this.props.token.accessToken
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {                          
            this.props.profile(data);            
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
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.token.type + ' ' + this.props.token.accessToken
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            this.props.profile(data);
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
                
        return (
            <div>
               My profile  {this.props.accessUser.id}: {this.props.accessUser.name} {this.props.accessUser.surname}
               <form onSubmit={this.handleSubmit}>
                    <label>Find By Name:
                        <input type="text" name="text" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <div >
                    {this.props.allUser.length > 0 ? Profile.renderUsersList(this.props.allUser) : <div>User not found</div>} 
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        token: state.token, 
        accessUser: state.accessUser,
        text: state.text,
        allUser: state.allUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        profile: (payload) => dispatch(profile(payload)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);