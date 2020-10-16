import { DO_REGISTER, REGISTER_SUCCESS, REGISTER_FAILED } from '../../config/constant'

const INITIAL_STATE = {
  fetchingRegister: false,
  dataRegister: null
}

export default function dataReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    // START USER
    case DO_REGISTER : {
      return {
        ...state,
        fetchingRegister: true,
        dataRegister: action.data
      }
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        fetchingRegister: false,
        dataRegister: action.data
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        fetchingRegister: false
      }
    }
    default:
    return state
  }
}