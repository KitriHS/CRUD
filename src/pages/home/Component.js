import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
// SCREEN
import DataUser from "../user/index";
import "../../App.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasreload: false,
      active: false
    };
    this.dataGroupRoleApi = this.generateGroupRoleApi();
    this.dataGenerateMenu = [
      {
        title: "Data Users CMS",
        value: "data-user",
        active: false,
        userRole: [1]
      }
    ];
  }

  generateGroupRoleApi() {
    let _dataGroupRole = [];
    let { dataGroupRole } = this.props.global;
    if (dataGroupRole != null) {
      dataGroupRole.map(obj => {
        _dataGroupRole.push(obj.id);
      });
    }
    return _dataGroupRole;
  }
  handleLogout = () => {
    const { dispatch } = this.props;
    const { logOutAction } = this.props.loginActions;
    logOutAction(dispatch);
  };

  handleChangePages = pages => {
    this.setState({ active: false });
    this.props.history.push(pages);
  };

  handleFilterUserRole = obj => {
    const { userRole } = this.props.global;
    let checkUserAccessMenu = false;
    for (let j = 0; j < obj.userRole.length; j++) {
      if (userRole === obj.userRole[j]) {
        checkUserAccessMenu = true;
        break;
      }
    }
    if (checkUserAccessMenu) {
      return obj;
    }
  };
  dataGroupRoleApi = [];
  dataGenerateMenu = [];

  generateRenderMenuRole() {
    let routerActive = this.props.location.pathname.substring(1);
    return (
      <Col className="sectionSideBar" lg="3" md="3" sm="12" xs="12">
        <Row className="HeadingTitle" style={{ justifyContent: 'center', marginBottom: 10 }}>Menu Utama</Row>
        {this.dataGenerateMenu
          .filter(this.handleFilterUserRole.bind(this))
          .map((obj, i) => {
            if (routerActive == "home") {
              routerActive = "dashboard";
            }
            return (
              <Row key={i} className="sub-title">
                <Link
                  onClick={() => this.handleChangePages(obj.value)}
                  className={
                    // this.state.currentPage === obj.value
                    routerActive === obj.value ? "menuActive" : "menuNormal"
                  }
                  to={`/${obj.value}`}
                >
                  {obj.title}
                </Link>
              </Row>
            );
          })}
        {true ? (
          <Row className="sub-title">
            <div onClick={this.handleLogout} className="menuNormal">
              Log Out
              </div>
          </Row>
        ) : (
            []
          )}
      </Col>
    );
  }

  renderSwitchComponent() {
    var renderComponent = [];
    const { history } = this.props;
    let activeComponent = history.location.pathname.split("/")[1];
    switch (activeComponent) {
      case "data-user":
        renderComponent = <DataUser />;
        break;
      default:
        renderComponent = <div>Page Not Found !</div>;
    }
    return renderComponent;
  }

  openNav() {
    this.setState({ active: true });
  }
  closeNav() {
    this.setState({ active: false });
  }

  generateMenuMobile() {
    let routerActive = this.props.location.pathname.substring(1);
    return (
      <div>
        <div
          className={["sidenav", this.state.active ? "active" : ""].join(" ")}
        >
          <div
            className="closebtn"
            style={{ color: "#fd7e14" }}
            onClick={() => this.closeNav()}
          >
            &times;
          </div>
          {this.dataGenerateMenu
            .filter(this.handleFilterUserRole.bind(this))
            .map((obj, i) => {
              if (routerActive == "home") {
                routerActive = "dashboard";
              }
              return (
                <div style={{ textAlign: "-webkit-center" }}>
                  <Link
                    onClick={() => this.handleChangePages(obj.value)}
                    to={`/${obj.value}`}
                  >
                    {obj.title}
                  </Link>
                </div>
              );
            })}
          {true ? (
            <div
              style={{ color: "#fff", textAlign: "-webkit-center" }}
              onClick={this.handleLogout}
            >
              <a>Log Out</a>
            </div>
          ) : (
              []
            )}
        </div>
        <div className="headem">
          <div
            style={{ fontSize: 22, color: "#008c9a" }}
            onClick={() => this.openNav()}
          >
            &#9776;
          </div>
          <div style={{ width: "90%", textAlign: "center", padding: 3 }}>
          </div>
        </div>
      </div>
    );
  }

  renderMobile() {
    return (
      <div>
        {this.generateMenuMobile()}
        {this.renderSwitchComponent()}
      </div>
    );
  }

  render() {
    const { isLogin } = this.props.login;
    const { success, message } = this.props.umrah;
    if (isLogin == false) return [];
    if (window.screen.availWidth < 756) {
      return this.renderMobile();
    } else {
      return (
        <div>
          <div className={["u-modal", success ? 'hide' : ''].join(' ')}>
            <div className="u-title-subtitle"
              style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}
            >{message}</div>
          </div>
          <Row>
            {this.generateRenderMenuRole()}
            <Col className="sectionContent" lg="9" md="9" sm="12" xs="12">
              {this.renderSwitchComponent()}
            </Col>
          </Row>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    global: state.global
  };
}

export default connect(mapStateToProps)(Home);
