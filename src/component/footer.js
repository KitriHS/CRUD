import React from "react";
import { Container, Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <Container>
        <Row className="footer">
          <Col className="footerContent">
            <div>Copyright © 2020 KH</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
