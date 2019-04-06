import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../middleware/auth';

const PRoute = props => {
    //If the user is logged in
    if(Auth.isLoggedIn()){
        //Use as a normal route
        return <Route {...props} />
    } else {
        //Redirect to Login Page
        return <Redirect to="/" />;
    }
}

export default PRoute;