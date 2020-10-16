import { servicesRegister } from './../../services/webServices';
import { DO_REGISTER, REGISTER_SUCCESS, REGISTER_FAILED } from './../../config/constant';

//REGISTER ACTION
export function registerAction(dispatch, data, callback) {
  dispatch(doRegister())
  return servicesRegister(data)
  .then( res => {
    setTimeout(() => {
      callback.call(this,res);
      dispatch(registerSuccess(res.data));
    }, 3000)
  })
  .catch(() => {
    return dispatch(registerFailed(false))
  })
}
//REGISTER ACTION

function doRegister(payload) {
  return {
    type: DO_REGISTER,
    data: payload
  }
}

function registerSuccess(payload) {
  return {
    type: REGISTER_SUCCESS,
    data: payload
  }
}

function registerFailed() {
  return {
    type: REGISTER_FAILED
  }
}
