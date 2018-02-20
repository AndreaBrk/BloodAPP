import React                    from 'react'
import ReactDOM                 from 'react-dom'
import store, { history }       from './store'
import auth                     from 'auth'
import { Provider }             from 'react-redux'
import {
  IndexRoute,
  browserHistory
}                               from 'react-router'
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider'
import App                      from './components/App'
import Profile                  from './components/Profile'
import LogIn                    from './components/LogIn'
import SignUp                   from './components/Signup'
import ResetPass                from './components/ResetPass'
import Dashboard                from './components/Dashboard'

import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
 }                                      from 'react-router-dom'

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
            <Route path="/login" component={LogIn} />
            <Route path="/sign_up" component={SignUp} />
            <Route path="/reset_password" component={ResetPass} />
            <App>
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </App>
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
