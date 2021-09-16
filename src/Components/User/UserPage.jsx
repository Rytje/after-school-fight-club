import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Footer from '../Layout/Footer';
import TopBar from '../Layout/TopBar';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PrivateRoute from '../PrivateRoute';

export default function UserPage() {

    let match = useRouteMatch();

    return (
        <div>
            <TopBar />
            <Switch>
                <Route path={`${match.url}/signup`}><SignUp /></Route>
                <Route path={`${match.url}/signin`}><SignIn /></Route>
                <PrivateRoute path={`${match.url}/dashboard`} component={Dashboard} ></PrivateRoute>
            </Switch>
            <Footer />
        </div>
    )
}
