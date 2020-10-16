import React, { Component } from  'react'
import { FormGroup, Col, Input, Label } from 'reactstrap'

export default class DropDown extends Component {
  render() {
    return (
      <FormGroup row>
        <Col xs="12" md="12">
          <Input value={this.props.value} type="select" onChange={this.props.onChange}>
            <option value="0">Select {this.props.label}</option>
            {
              this.props.data.map(result => (
                <option key={result.id} value={result.id}>{result.name}</option>
              ))
            }
          </Input>
          {/* <TextValidateDropDown label={this.props.label} value={this.props.value} /> */}
        </Col>
      </FormGroup> 
    )
  }
}