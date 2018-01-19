import React                    from 'react';
import ReactDOM                 from 'react-dom';
import store, { history }       from './store';
import { Provider }             from 'react-redux';
import { 
  IndexRoute, 
  browserHistory 
}                               from 'react-router';
import App                      from './containers/App';
import {
  BrowserRouter as Router,
  Route,
  Switch
 }                                      from 'react-router-dom';

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router basename="/" component={App}>
      <Switch>
          {/* <App>
            <Route exact path="/" component={Home} />
            <Route path="/todo" component={Todo} />
          </App> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
