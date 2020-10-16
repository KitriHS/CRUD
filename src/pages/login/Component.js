import React from 'react';
import { Row, Col } from 'reactstrap';
import LoginForm from './../../component/forms/Login';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }

  componentWillMount(){
    if (window.screen.availWidth < 756){
      this.setState({mobile:true})
    } else {
      this.setState({mobile:false})
    }
  }
  render() {
    return (
      <div className="login">
        <Row style={this.state.mobile ? {height:'100vh', alignItems: 'center', justifyContent: 'center'} : {alignItems: 'center', justifyContent: 'center'}}>
          <Col lg="3" md="6" sm="12" xs="12">
            <Row className="FormLogin">
              <LoginForm {...this.props}/>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
