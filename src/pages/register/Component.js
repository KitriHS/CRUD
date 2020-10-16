import React from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row, Alert } from "reactstrap";
import SubHeader  from "../../component/sub-header"
import { PulseLoader } from "react-spinners";
import Dropdown from '../../component/dropdown'
import Loading from '../../component/Loading/index'

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confrimPassword: "",
      errorMessage : "",
      group_role_id:  "",
      role_data: [{'id': '1', 'name': 'Master', "alias": "MA",   "description": "Access All Menu"}, {'id': '2', 'name': 'Agent', "alias": "AG","description": "Access Multiple Menu"}],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this)
    this.handleRole = this.handleRole.bind(this)
  }

  handleCallbackRegister(callback){
    const { setAlertMessage } = this.props.actionsAlert;
    const { dispatch } = this.props;
    if (callback.success){
      const { fetchingRegister, history } = this.props
      if(!fetchingRegister) {
        window.location.reload()
        setAlertMessage(dispatch, true, {title:'Info', message:"Success Regiter"});
        history.push('/home');
      }
    } else {
      setAlertMessage(dispatch, true, {title:'Info', message:"Server Empty Response"});
    }
  }
  handleRegister = () => {
    const { registerAction  } = this.props.actions
    const { dispatch } = this.props;

    if(this.state.name === "" || this.state.group_role_id === "" || this.state.email === "" || this.state.phone === "" || this.state.password === "" || this.state.confrimPassword === "") {
      this.setState({ errorMessage: "Fill in all data completely and correctly" })
    } else {
      let { name, email, phone, password, group_role_id} = this.state
      let dataPost = {
        name: name,
        group_role_id: parseInt(group_role_id),
        email: email,
        phone: phone,
        password: password
      }
      registerAction(dispatch, dataPost, this.handleCallbackRegister.bind(this));
    }
  }
  handleOnKeyPress(e){ if (e.key.toLowerCase()==='enter'){this.handleRegister() }}
  handleChange (evt) {this.setState({ [evt.target.id]: evt.target.value })}
  handleRole(e) { this.setState({group_role_id: e.target.value}) }

  handleValidate(require, field=''){
    const { email,confrimPassword, password, name, phone } = this.state;
    let errorMessage=`Please fill in ${field}`;
    // EMAIL //
    if (field==='email'){
      let _emailcheck = email.match(/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-zA-Z\.]{2,6})$/);
      if (email.length> 0 && _emailcheck==null){
        return(
          <div style={{color:'red',fontSize:12}} ><i>The email you entered is invalid</i></div> 
        );
      } 
       else { return [] }
    } 
    if (field==='name'){
      let _namecheck = name.match(/^[a-zA-Z\s]+$/)
      if (name.length> 0 && _namecheck==null){
        return( <div style={{color:'red', fontSize:12}} ><i>Names may only consist of letters and spaces</i></div> )
      } else { return [] }
    }
    if(field==='password'){
      let _passwordcheck = password.match("^(((?=.*[a-z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[0-9])))(?=.{6,})")
      if(password.length> 0 && _passwordcheck==null) {
        return(
          <div style={{color:'red',fontSize:12}} ><i>Password must be 6 digits</i></div> 
        )
      } else { return [] }
    }
    if(field==='confirmation password'){
      if(password != confrimPassword) {
        return(
          <div style={{color:'red',fontSize:12}} ><i>Password & confirm password must be the same</i></div> 
        )
      } else { return [] }
    }
    if (field==='phone'){
      let _phonecheck = phone.match("^[0-9]")
      if (phone.length> 0 && _phonecheck==null){
        return( <div style={{color:'red'}} ><i>The phone number you entered is invalid</i></div> )
      } else { return [] }
    }
  }
  renderSubmit(){
    const {name, group_role_id, email, phone, password, confrimPassword} = this.state
    let {fetchingRegister} = this.props
    if(name === "" || group_role_id === "" || email === "" || phone === "" ||password === "" || confrimPassword === ""){
      return(
        <Button className="button-disable" onClick={this.handleRegister} disabled>
          { (this.props.fetchingRegister === true) ?
            <PulseLoader sizeUnit={"px"} size={10} color={'white'} loading={true}/> :<b>REGISTER</b>
          }
        </Button>
      )
    } else if (fetchingRegister === true) {
      return(
        <div>
          <Button className="button-register" onClick={this.handleRegister}> <PulseLoader sizeUnit={"px"} size={10} color={'white'} loading={true}/></Button>
        </div> 
      )
    }
    else {
      return(
        <Button className="button-register" onClick={this.handleRegister}><b>REGISTER</b></Button>
      )
    }
  }
  renderLoading(){
    return(
      <div className="box-loading" style={{marginTop: 50, marginBottom:50}}>
        <Loading
          type="PulseLoader"
          loading={true}
          color={'#0290d2'}
          size={25}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="section-search">
        <Row className="search-flight-heading"  style={{ paddingBottom: "40px" }} >
          Register
        </Row>
        <Row className="step-form-table">
          <div style={{ width: "100%" }}>
            <SubHeader title={"Register"} />
            <Col style={{width: '90%', marginRight: '3.5vw', marginLeft: '3.5vw'}}>
              <Form style={{ paddingBottom: 10 }}>
                <FormGroup style={{marginTop: '2vw'}}>
                  <Label className="SignupLabel" for="exampleEmail">Email Address</Label>
                  <Input  onChange={this.handleChange} type="text" id="email" placeholder="Email Address" />
                  {this.handleValidate(true,'email')}
                </FormGroup>
                <FormGroup>
                  <Label className="SignupLabel" for="exampleText"> User Role </Label>
                  <Dropdown label="Role" id="group_role_id" data={this.state.role_data} onChange={this.handleRole} />
                  {this.handleValidate(true,'user role')}
                </FormGroup>
                <FormGroup>
                  <Label className="SignupLabel" for="exampleText"> Name </Label>
                  <Input onChange={this.handleChange} type="text" id="name" placeholder="Name"/>
                  {this.handleValidate(true,'name')}
                </FormGroup>
                <FormGroup>
                  <Label className="SignupLabel" for="examplePassword"> Password </Label>
                  <Input onKeyPress={ this.handleOnKeyPress } onChange={this.handleChange} type="password" id="password" placeholder="Password" />
                  {this.handleValidate(true,'password')}
                </FormGroup>
                <FormGroup>
                  <Label className="SignupLabel" for="examplePassword"> Confirmation Password </Label>
                  <Input onKeyPress={ this.handleOnKeyPress } onChange={this.handleChange} type="password" id="confrimPassword" placeholder="Confrim Password"/>
                  {this.handleValidate(true,'confirmation password')}
                </FormGroup>
                <FormGroup>
                  <Label onChange={this.handleChange} className="SignupLabel"> Phone Number </Label>
                  <Input type="number" id="phone" onChange={this.handleChange} placeholder="Phone Number"/>
                  {this.handleValidate(true,'phone')}
                </FormGroup>
                <FormGroup style={{ textAlign: "center", marginTop: '2vw', marginBottom:'2vw' }}>
                  {this.renderSubmit()}
                </FormGroup>
              </Form>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}
