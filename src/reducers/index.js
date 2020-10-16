import { combineReducers } from 'redux';
import dataReducer from './default-reducer';
import Login from './../pages/login/Reducer';
import User from './../pages/user/Reducer'
import Register from '../pages/register/Reducer'
import Alertmessage from './../component/Alert/Reducer';

const rootReducers = combineReducers({
  global: dataReducer,
  login: Login,
  user: User,
  register: Register,
  alertmessage: Alertmessage,
});

export default rootReducers;