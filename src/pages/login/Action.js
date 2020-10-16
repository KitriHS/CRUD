import { servicesLogin } from './../../services/webServices';
import { DO_LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, SET_USER_ACTIVE, LOG_OUT, CLEAR_USER_ACTIVE } from './../../config/constant';

//LOGIN ACTION
export function LoginAction(dispatch, data, callback) {
  dispatch(doLogin())
  return servicesLogin(data)
  .then( res => {
    console.log(res.data, 'ini data login')
    dispatch(loginSuccess(res.data));
    dispatch(setUserActive(res.data));
    callback.call(this,res);
  })
  .catch(() => {
    return dispatch(loginFailed(false))
  })
}

//LOGINOUT ACTION
export function logOutAction(dispatch) {
    dispatch(logOut(false));
    dispatch(clearUserActive(null));
}

function doLogin(payload) {
  return {
    type: DO_LOGIN,
    data: payload
  }
}

function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    data: payload
  }
}

function loginFailed() {
  return {
    type: LOGIN_FAILED
  }
}

function logOut() {
  return {
    type: LOG_OUT
  }
}

function setUserActive(payload) {
  return {
    type: SET_USER_ACTIVE,
    data: payload
  }
}

function clearUserActive(payload) {
  return {
    type: CLEAR_USER_ACTIVE,
    data: payload
  }
}
