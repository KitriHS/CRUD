import { SET_ALERT_MESSAGE } from '../../config/constant'

const INITIAL_STATE = {
  show: false,
  dataPopUpAlert: {title : 'Info', message:'Check your data'},
  width:'30vw'
}

export default function AlertMessageReducer(state = INITIAL_STATE, action) {
  
  switch(action.type){
    case SET_ALERT_MESSAGE: {
      return {
        ...state,
        show: action.show,
        dataPopUpAlert: action.dataPopUpAlert,
        width: action.width
      }
    }

    default:
    return state
  }
}