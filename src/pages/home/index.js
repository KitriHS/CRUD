import { connect } from 'react-redux';
import Component from './Component';
import * as loginActions from './../../pages/login/Action';

const mapStateToProps=(state)=>{
  return {
    ...state
  };
}

const mapDispatchToProps=(dispatch)=>{
  return { dispatch, loginActions };
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
