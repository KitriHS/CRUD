import { SET_ALERT_MESSAGE } from './../../config/constant'

//SET ALERT MESSAGE
export function setAlertMessage (dispatch, show, dataPopUpAlert, width) {
  dispatch(alertMessages(show, dataPopUpAlert, width))
}

function alertMessages(show, dataPopUpAlert, width) {
  return {
    type: SET_ALERT_MESSAGE,
    show,
    dataPopUpAlert,
    width
  }
}