import { connect } from 'react-redux';
import Component from './Component';
import * as actions from './../../../pages/login/Action';
import * as actionsAlert from '../../Alert/Action';
const mapStateToProps = (state) => {
  return {
    ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch, actions, actionsAlert };
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
