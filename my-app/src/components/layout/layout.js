import React, { Component } from 'react';

class Layout extends Component {

    render() {
        return (
            <div id="main">
                <ul >
                    <li><a href="/" >Home</a></li>
                    <li><a href="/register" >Register</a></li>
                    <li><a href="/login" >Login</a></li>
                </ul>
                {this.props.children}
            </div>
        )
    }

}

export default Layout;