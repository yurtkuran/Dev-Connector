import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// bring in components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// bring in redux
import { Provider } from 'react-redux';
import store from './store';

// bring in actions
import { loadUser } from './actions/authActions';

// bring in functions
import setAuthToken from './utils/setAuthToken';

// css file
import './App.css';

// if a token exists in local storage, add to global header
if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        setAuthToken(localStorage.token);
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={Landing} />
                        <Route component={Routes} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
