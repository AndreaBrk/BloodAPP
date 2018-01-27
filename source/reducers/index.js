import { combineReducers }              from 'redux';
import { routerReducer }                from 'react-router-redux';
import auth                             from './auth';
import donations                        from './donations';



export default combineReducers({
  routing: routerReducer,
  auth,
  donations
});
