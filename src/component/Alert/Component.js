import React from "react"
import Label from "./../Label";
import Button from './../Button'

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleBackButton() {
    const { dispatch } = this.props;
    const { setAlertMessage } = this.props.actions;
    setAlertMessage(dispatch, false, {});
  }

  render() {
    const { show, dataPopUpAlert, width='30vw' } = this.props.alertmessage;
    const { title= 'INFO', message } = dataPopUpAlert

    return (
      <div className={show ? 'box-popup-alert-active' : 'box-popup-alert'}>
        <div className="box-view-popup" style={{width:width }}>
          <div className="f-column">
            <Label size={18} color={'#222'} bold={600} mTop={10} mRight={10} mLeft={10}>{title}</Label>
            <Label mTop={10} mRight={10} mLeft={10} mBottom={20}>{message}</Label>
            <div className="f-row is-justified-end">
              <Button width="100px"  handleSubmit={this.handleBackButton.bind(this)} brdColor={'#a2195b'} radius={10} bgColor={'#a2195b'}>
                <Label pLeft={15} pRight={15} pTop={10} pBottom={10} bold={'bold'} color={'#fff'}>OK</Label>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}