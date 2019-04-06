import React, { Component } from 'react';
import './secret.css';

import Auth from '../../middleware/auth';

class SecretPage extends Component {

    handleLogout = (e) => {
        Auth.logout();
        this.props.history.replace('/');
    }

    render(){
        document.title = 'Secret';
        return(
            <div id="SecretPage">
                <h1>Secret</h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default SecretPage;