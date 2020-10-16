import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { SECOND_COLOR } from "../../../config/constant";
import { PulseLoader } from "react-spinners";
import logo from "./../../../assets/svg/asita-logo.svg";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleCallbackLogin(callback) {
    const { history } = this.props;
    if (callback.success) {
      history.push("/home");
    } else {
      let message = !callback.message ? "" : callback.message;
      this.setState({ errorMessage: message });
    }
  }
  handleLogin = () => {
    const { LoginAction } = this.props.actions;
    console.log(LoginAction, 'ini data login')
    const { dispatch } = this.props;
    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        errorMessage: "Masukan email dan password dengan benar"
      });
    } else {
      let { email, password } = this.state;
      let dataPost = {
        email: email,
        password: password
      };
      LoginAction(dispatch, dataPost, this.handleCallbackLogin.bind(this));
    }
  };

  handleOnKeyPress = e => {
    if (e.key.toLowerCase() === "enter") {
      this.handleLogin();
    }
  };

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  render() {
    const { fetchingLogin } = this.props.login;
    return (
      <div style={{ padding: 20, paddingLeft: 50, paddingRight: 50 }}>
        <Form>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <img
              alt="Logo"
              src={!logo ? "" : logo}
              style={{ width: "70%", marginTop: 15 }}
            />
          </div>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="text" onChange={this.handleChange} id="email" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              onKeyPress={this.handleOnKeyPress}
              type="password"
              onChange={this.handleChange}
              id="password"
            />
          </FormGroup>
          {/* <FormGroup>
              <Label style={{ fontSize: 14 }} for="examplePassword">Lupa password? <span style={{ fontWeight: 'bold', color: SECOND_COLOR }}><i><u>Klik Disini</u></i></span> </Label>
          </FormGroup> */}
          {this.state.errorMessage !== "" ? (
            <Alert color="danger">{this.state.errorMessage}</Alert>
          ) : (
              ""
            )}
          <FormGroup style={{ textAlign: "center", paddingTop: 20 }}>
            <Button
              onClick={this.handleLogin}
              type="button"
              style={{
                backgroundColor: "#008c9a",
                borderColor: "#008c9a",
                paddingLeft: 75,
                paddingRight: 75
              }}
            >
              {// (this.props.global.fetchingLogin === true) ?
                fetchingLogin === true ? (
                  <PulseLoader
                    sizeUnit={"px"}
                    size={10}
                    color={"white"}
                    // loading={true}
                    loading={fetchingLogin}
                  />
                ) : (
                    <b>LOGIN</b>
                  )}
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
