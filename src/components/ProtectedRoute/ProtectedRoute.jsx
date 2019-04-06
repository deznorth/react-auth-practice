import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../middleware/auth';

const PRoute = props => {
    if(Auth.isLoggedIn()){
        return <Route {...props} />
    } else {
        return <Redirect to="/" />;
    }
}

export default PRoute;