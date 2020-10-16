import React from "react";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  _renderButtonRegister = () => {
    return (
      <Link style={{ textDecoration: "none" }} to="/signup">
        <div className="headerMenu" style={{ fontWeight: "bold" }}>
          DAFTAR
        </div>
      </Link>
    );
  };
  render() {
    if (window.screen.availWidth < 756) {
      return [];
    } else {
      return (
        <Container fluid>
          <Row className="header">
            <Col className="headerLogo" lg="6" md="6" sm="6" xs="6">
              <div className="align-self-center">
              </div>
            </Col>
            <Col className="headerMenu" lg="6" md="6" sm="6" xs="6">
              <div style={{ fontWeight: "bold" }}>
                {/* { (this.props.global.isLogin === false) ? this._renderButtonRegister() : ""}  */}
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    global: state.global
  };
}

export default connect(mapStateToProps)(Header);
