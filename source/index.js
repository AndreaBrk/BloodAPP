import React                    from 'react';
import ReactDOM                 from 'react-dom';
import store, { history }       from './store';
import { Provider }             from 'react-redux';
import { 
  IndexRoute, 
  browserHistory 
}                               from 'react-router';
import App                      from './containers/App';
import Profile                  from './components/Profile';
import LogIn                    from './components/LogIn';
import Dashboard                    from './components/Dashboard';

import {
  BrowserRouter as Router,
  Route,
  Switch
 }                                      from 'react-router-dom';

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router basename="/" component={App}>
      <Switch>
          <App>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/dashboard" component={Dashboard} />
            {/* <Route path="/todo" component={Todo} /> */}
          </App>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
