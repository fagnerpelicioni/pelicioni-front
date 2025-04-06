import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('auth-token');

    return (
        <Router>
            <Switch>
                <Route
                    path="/login"
                    render={() =>
                        isAuthenticated ? <Redirect to="/home" /> : <LoginPage />
                    }
                />
                <Route
                    path="/register"
                    render={() =>
                        isAuthenticated ? <Redirect to="/home" /> : <RegisterPage />
                    }
                />
                <Route
                    path="/home"
                    render={() =>
                        isAuthenticated ? <HomePage /> : <Redirect to="/login" />
                    }
                />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    );
};

export default App;