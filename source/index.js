import React                    from 'react';
import ReactDOM                 from 'react-dom';
import store, { history }       from './store';
import { auth }                 from 'utilities/auth';
import { Provider }             from 'react-redux';
import {
  IndexRoute,
  Redirect,
  browserHistory
}                               from 'react-router';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import App                      from './containers/App';
import Profile                  from './components/Profile';
import LogIn                    from './components/LogIn';
import SignUp                   from './components/Signup';
import Dashboard                    from './components/Dashboard';

import {
  BrowserRouter as Router,
  Route,
  Switch
 }                                      from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.user() ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)

ReactDOM.render(
  <Provider store={store} key="provider">
    <MuiThemeProvider>
      <Router basename="/" component={App}>
        <Switch>
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signUp" component={SignUp} />
            <App>
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </App>
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
