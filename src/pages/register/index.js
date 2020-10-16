import { connect } from "react-redux";
import Component from "./Component";
import * as actions from "./Action.js";
import * as actionsAlert from '././../../component/Alert/Action';

const mapStateToProps = state => {
  return {
    ...state
  };
};
  
const mapDispatchToProps = dispatch => {
  return { dispatch, actions, actionsAlert };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
  
