import React, { Component } from 'react';
import { connect } from 'react-redux';
import  './layout.css'

class Layout extends Component {
       
    render() {
                   
        return (
            <div id="main">
                <header>
                    <div className='home'>
                        <a href="/" >Home</a>
                    </div>
                    <div className='sine'>
                        {this.props.token ? <a href="/profile">My Profile</a> : <a href="/register" >Register</a>}
                        {this.props.token ? <a href="/logout">Logout</a> : <a href="/login" >Login</a>}    
                    </div>   
                </header>
                
                {this.props.children}
            </div>
        )
    }

}
const mapStateToProps = ({token}) => {
    return {
       token
    }
};

export default connect(mapStateToProps, undefined)(Layout);