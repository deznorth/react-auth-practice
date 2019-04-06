import React, { Component } from 'react';
import './secret.css';

import Auth from '../../middleware/auth';

class SecretPage extends Component {

    state = {}

    handlePull = (e) => {
        const token = localStorage.getItem('auth_token');

        fetch(`/api/account/test?token=${token}`).then(res => res.json().then( data => {
            //const {success, message} = data;
            this.setState({
                ...data
            });            
        }));
    }  

    handleLogout = (e) => {
        Auth.logout();
        this.props.history.replace('/');
    }

    render(){
        document.title = 'Secret';

        let message;
        if(this.state.success !== undefined){
            message = this.state.success ?
            <div><br/><p className="alert alert-success">{this.state.message}</p></div> :
            <div><br/><p className="alert alert-danger">{this.state.message}</p></div> ;
        }
        
        return(
            <div id="SecretPage">
                <h1>Secret</h1>
                <button className="btn btn-warning" onClick={this.handleLogout}>Logout</button>
                <hr/>
                <button className="btn btn-primary" onClick={this.handlePull}>Pull super confidential data!</button>
                {message}
            </div>
        );
    }
}

export default SecretPage;