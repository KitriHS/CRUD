import { connect } from "react-redux";
import Component from "./Component";
import * as actions from "./Action.js";

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return { dispatch, actions };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
