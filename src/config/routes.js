import React from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "../component/header";
import Footer from "../component/footer";
import Login from "../pages/login/index";
import Home from "../pages/home/index";
import { connect } from "react-redux";
import * as globalActions from './../actions';
import AlertMessage from './../component/Alert';
import DataUser from '../pages/user/index';
import Register from '../pages/register/index';


class RootComponent extends React.PureComponent {

  componentWillMount() {
    this.handleLoadGroupRole();
  }

  handleLoadGroupRole() {
    const { dispatch } = this.props;
    const { getGroupRoleAction } = this.props.globalActions;
    let params = { q: '', page: 1, limit: 20 };
    getGroupRoleAction(dispatch, params);
  }

  handleOAuth() {
    const { isLogin } = this.props.login;
    return isLogin;
  }

  render() {
    const loggedIn = this.handleOAuth();
    return (
      <Router>
        <Container fluid style={{ margin: 0, padding: 0, backgroundColor: "#F0F0F0" }} >
          <AlertMessage />
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 0 }}>
            {/* HEADER */}
            {loggedIn ? (
              <Container className="containerHeader" fluid >
                <Header />
              </Container>
            ) : null}
            {/* HEADER */}
            {/* CONTENT */}
            <Container fluid style={{ minHeight: "90vh", backgroundColor: "#F0F0F0" }}>
              <Route path="/" component={DataUser}/>
              <Route path="register" component={Register}/>
            </Container>
            {/* CONTENT */}
            {/* FOOTER */}
            {loggedIn ? (
              <Container className="containerHeader" fluid>
                <Footer />
              </Container>
            ) : null}
            {/* FOOTER */}
          </div>
        </Container>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    global: state.global,
    login: state.login,
    dataListUser: state.dataListUser,
    dataRegister: state.dataRegister,
    dataEditUser: state.dataEditUser
  };
}
const mapDispatchToProps = (dispatch) => {
  return { dispatch, globalActions };
}

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);
