import React from "react";
import { Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert, Col } from "reactstrap";
import SubHeader from "../../component/sub-header";
import moment from "moment";
import PaginationRemote from './../../component/PaginationRemote';
import { PRIMARY_COLOR } from "../../config/constant";
import { PulseLoader } from "react-spinners";
import Dropdown from '../../component/dropdown'
import Loading from '../../component/Loading/index'

export default class DataUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOrder: false,
      search: "",
      params: {
        q: '',
        page: 1,
        limit: 30,
        sizePerPage: 30,
        totalSize: 200
      },
      errorMessage: "",
      selectDetail: null,
      name: '',
      email: '',
      group_role_id: '',
      role_data: [{ 'id': '1', 'name': 'Master', "alias": "MA", "description": "Access All Menu" }, { 'id': '2', 'name': 'Agent', "alias": "AG", "description": "Access Multiple Menu" }],
      phone: '',
      mobile: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRole = this.handleRole.bind(this)
    this.toggleprimary = this.toggleprimary.bind(this);
    this.toggleEditData = this.toggleEditData.bind(this);
  }
  componentWillMount() {
    this.handleResetUserAction();
    const { q, page, limit } = this.state.params;
    this.loadDataListUser(q, page, limit);
    if (window.screen.availWidth < 756) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }
  handleResetUserAction() {
    const { dispatch } = this.props;
    const { resetUserAction } = this.props.actions;
    resetUserAction(dispatch);
  }
  renderStatusUsers(id, row) {
    return (
      <div>TEST</div>
    );
  }
  handleInputSearch(index) {
    const { data } = this.state;
    const { setSearching } = this.props.actionsCommon;
    let dataPost = {
      products: data[index].booking
    };
    setSearching(dataPost);
  }
  //EDIT
  toggleprimary() { this.setState({ modal: !this.state.modal }); }
  toggleEditData(row, callback) {
    this.setState({ modalOrder: !this.state.modalOrder, selectDetail: row }, this.handleCallback.bind(this));
  }
  handleChange(evt) {
    let { selectDetail } = this.state;
    selectDetail[evt.target.id] = evt.target.value;
    this.setState({ [evt.target.id]: evt.target.value, selectDetail })
  }
  handleRole(evt) {
    let { selectDetail } = this.state
    selectDetail["group_role_id"] = evt.target.value;
    this.setState({ [evt.target.group_role_id]: evt.target.value, selectDetail })
  }
  handleCallback() {
    const { fetchingEdit, history } = this.props
    if (fetchingEdit === true) {
      window.location.reload()
      alert("Data have been added")
      history.push('/home');
    } else {
      this.setState({ errorMessage: "Error" })
    }
  }

  handleSubmitEdit = () => {
    const { userEditAction } = this.props.actions;
    const { dispatch } = this.props;
    const { id, name, group_role_id = 1, email, phone } = this.state.selectDetail;
    if (name === "" || group_role_id === "" || email === "" || phone === "") {
      this.setState({ errorMessage: "Fill in all data completely and correctly" })
    } else {
      let dataPost = {
        name: name,
        group_role_id: parseInt(group_role_id),
        email: email,
        phone: phone,
      }
      userEditAction(dispatch, id, dataPost, this.handleCallback.bind(this));
      this.setState({ modalOrder: false });
    }
    // window.location.reload();
  }
  //EDIT
  //DELETE
  loadDataListUser(query, page, limit) {
    const { dispatch } = this.props;
    let params = {
      q: query,
      page: page,
      limit: limit
    }
    const { userAction } = this.props.actions;
    let token = !this.props.login.token ? '' : this.props.login.token;
    userAction(dispatch, params, token);
  }
  handleCallbackDelete(callback) {
    if (callback.success) {
      const { fetchingDelete, history } = this.props
      if (!fetchingDelete) {
        window.location.reload()
        alert("Data have been delete")
        history.push('/home');
      } else {
        this.setState({ errorMessage: "Error" })
      }
    }
  }
  deleteData(row) {
    const { dispatch } = this.props;
    let params = {
      id: row.id
    }
    const { userDelete } = this.props.actions;
    let token = !this.props.login.token ? '' : this.props.login.token;
    userDelete(dispatch, params, token, this.handleCallbackDelete.bind(this));
  }
  //DELETE
  actionCol(scope, row, data) {
    return (
      <div>
        {/* <Button className="button-primary" >VIEW</Button>{' '} */}
        <Button color="primary" onClick={() => this.toggleEditData(row)}>EDIT</Button>{' '}
        <Button color="danger" onClick={() => this.deleteData(row)}>DELETE</Button>
      </div>
    );
  }
  index = 0
  columns = [
    { dataField: "index", text: "No", headerStyle: { width: "5%" } },
    { dataField: "firstName", text: "First Name", headerStyle: { width: "15%" } },
    { dataField: "lastName", text: "Last Name", headerStyle: { width: "20%" } },
    { dataField: "age", text: "Age", headerStyle: { width: "15%" } },
    // { dataField: "photo", text: "Photo", headerStyle: { width: "10%" } },
    { dataField: "createdAt", text: "DATE CREATE", headerStyle: { width: "15%" }, formatter: (id, row) => moment(row.createdAt).format("DD-MM-YYYY hh:mm") },
    { dataField: "action", text: "ACTION", headerStyle: { width: "20%" }, formatter: this.actionCol.bind(this) },
  ];

  reloadDataUser = false;

  handleTableChange = (type, { page, sizePerPage }) => {
    let { params } = this.state;
    params.page = page;
    params.sizePerPage = sizePerPage;
    this.loadDataListUser(params.q, params.page, params.limit);
    this.setState({ params: params });
  }
  handleChangeSearch(value) {
    let { params } = this.state;
    params.q = value;
    this.setState({ params });
    this.loadDataListUser(params.q, params.page, params.limit);
  }

  renderLoading() {
    return (
      <div className="box-loading" style={{ marginTop: 50, marginBottom: 50 }}>
        <Loading
          type="PulseLoader"
          loading={true}
          color={'#008c9a'}
          size={25}
        />
      </div>
    )
  }

  render() {
    const { fetchingListUser, fetchingEdit } = this.props.user;
    // if (!fetchingListUser) return this.renderLoading();
    const { params, selectDetail, mobile } = this.state;
    const { meta = { total: 1 } } = this.props.user;
    let dataViewListUser = this.props.user.dataListUser == null ? [] : this.props.user.dataListUser;
    let index = 0;
    dataViewListUser.map((obj, i) => {
      index++;
      obj.index = params.page === 1 ? index : index + Number(params.page * params.sizePerPage) - 30;
    });
    return (
      <div className="section-search">
        <Row className="search-flight-heading bot">
          Data User
        </Row>
        <Row className="step-form-table">
          <div style={{ width: "100%" }}>
            <SubHeader title={"Data User"} />
            <div className="form-search" style={mobile ? { overflow: "scroll", width: window.innerWidth - 20 } : {}}>
              <PaginationRemote tableUser={true}
                searchPlaceholder="Search in Here"
                loading={fetchingListUser}
                handleChangeSearch={this.handleChangeSearch.bind(this)}
                searchValue={params.q}
                data={dataViewListUser}
                columns={this.columns}
                page={params.page}
                sizePerPage={params.sizePerPage}
                totalSize={!meta ? 1 : meta.total}
                onTableChange={this.handleTableChange}
              />
              <Modal isOpen={this.state.modalOrder} toggleprimary={this.toggleEditData} className="modal-primary ">
                <ModalHeader style={{ background: PRIMARY_COLOR, color: "#ffffff" }} toggle={this.toggleEditData} >
                  Edit User
                  </ModalHeader>
                <ModalBody style={{ marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}>
                  <Row className="show-tab">
                    <Form style={{ paddingBottom: 10, marginLeft: 20, marginTop: 15, marginRight: 20 }}>
                      <FormGroup>
                        <Label className="SignupLabel" for="examplePassword"> Email Address </Label>
                        <Input style={{ width: '25vw' }} type="text" id="email" onChange={this.handleChange} value={selectDetail === null ? '' : !selectDetail.email ? '' : selectDetail.email} />
                      </FormGroup>
                      <FormGroup>
                        <Label className="SignupLabel" for="examplePassword"> Name </Label>
                        <Input style={{ width: '25' }} type="text" id="name" onChange={this.handleChange} value={selectDetail === null ? '' : !selectDetail.name ? '' : selectDetail.name} />
                      </FormGroup>
                      <FormGroup>
                        <Label className="SignupLabel" for="examplePassword"> User Role </Label>
                        <Dropdown label="Role" id="group_role_id " data={this.state.role_data} onChange={this.handleRole} value={selectDetail === null ? '' : !selectDetail.group_role_id ? '' : selectDetail.group_role_id} />
                      </FormGroup>
                      <FormGroup>
                        <Label className="SignupLabel" for="examplePassword"> Phone Number </Label>
                        <Input style={{ width: '25' }} type="number" id="phone" onChange={this.handleChange} value={selectDetail === null ? '' : !selectDetail.phone ? '' : selectDetail.phone} />
                      </FormGroup>
                      <FormGroup style={{ marginTop: '2vw' }}>
                        <Button style={{ width: '25' }} className="button-register" onClick={this.handleSubmitEdit}>
                          {(fetchingEdit) ?
                            <PulseLoader sizeUnit={"px"} size={10} color={'red'} loading={true} /> : <b>DONE</b>
                          }
                        </Button>
                      </FormGroup>
                    </Form>
                  </Row>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}
