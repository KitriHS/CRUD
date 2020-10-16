import {DO_LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOG_OUT } from './../../config/constant';

const INITIAL_STATE = {
  isLogin: false,
  fetchingLogin: false,
  token : ""
}

export default function dataReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    // START LOGIN
    case DO_LOGIN : {
      return {
        ...state,
        isLogin:false,
        fetchingLogin: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        fetchingLogin: false,
        token: action.data.access_token
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLogin: false,
        fetchingLogin: false,
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isLogin: false,
        fetchingLogin: false,
        token:''
      }
    }
    default: 
      return state
  }
}