import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';

import Auth from '../../middleware/auth';

class LoginPage extends Component {

    state = {
        username: '',
        password: '',
        redirect: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleSubmit = (e) => {
        fetch('/api/account/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(res => res.json().then(data => {
            const {success, message, token} = data;
            
            switch(success){
                case true:
                    localStorage.setItem('auth_token', token);
                    this.setState({
                        error: undefined,
                        redirect: true
                    });
                    break;
                case false:
                    this.setState({
                        error: message
                    });
                    break;
            }
        }));
        e.preventDefault();
    }

    render(){
        let redirect;
        if(Auth.isLoggedIn()){
            redirect = <Redirect to="/secret" />;
        }
        document.title = 'Login';
        let errorMessage;
        if(this.state.error){
            errorMessage = <div><br/><p className="alert alert-danger">{this.state.error}</p></div>;
        }

        return(
            <div id="LoginPage">
                {redirect}
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">User</span>
                        </div>
                        <input name="username" onChange={this.handleChange} type="text" className="form-control" placeholder="Username"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Pass</span>
                        </div>
                        <input name="password" onChange={this.handleChange} type="password" className="form-control" placeholder="Password" />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
                {errorMessage}
            </div>
        );
    }
}

export default LoginPage;