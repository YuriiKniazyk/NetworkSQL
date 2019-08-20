import React, { Component } from 'react';

class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;            

        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        fetch('http://localhost:3300/user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({name: this.state.name, surname: this.state.surname, email: this.state.email, password: this.state.password})
        })
            .then(response => response.json())
            .then(data => {
                this.props.history.push("/");
            });
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label>Surname:
                <input type="text" name="surname" value={this.state.surname} onChange={this.handleChange} />
                    </label>
                    <label>Email:
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <label>Password:
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }

}

export default CreateUser;