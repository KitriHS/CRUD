import React from 'react';
import './styles.css';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationProvider, PaginationListStandalone } from "react-bootstrap-table2-paginator";
import { Row, Col, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import Loading from '../../component/Loading/index';

export default class PaginationRemote extends React.Component {
  state = {
    search: '',
  }
  handleChangeSearch(value) {
    const { handleChangeSearch } = this.props;
    this.setState({ search: value })
    if (handleChangeSearch) {
      handleChangeSearch(value);
    }
  }

  renderLoading() {
    return (
      <div className="box-loading" style={{ marginTop: 50, marginBottom: 50 }}>
        <Loading
          type="PulseLoader"
          loading={true}
          color={'#0290d2'}
          size={15}
        />
      </div>
    )
  }
  render() {
    const { search } = this.state;
    const { tableUser, tableReport, loading, download, dataexport, tableCustomers, onClickAgent, onClickSubAgent, tableAgent } = this.props
    const { custom = true, searchPlaceholder, page, sizePerPage, totalSize, data, columns, onTableChange, paginationSize = 8 } = this.props;

    return (
      <div>
        {tableCustomers ?
          <Row>
            <Col size={5}>
              <div className="box-input-search">
                <input value={search} placeholder={searchPlaceholder} onChange={(e) => this.handleChangeSearch(e.target.value)} className="input-search-user" />
              </div>
            </Col>
            <Col size={5} style={{ textAlign: 'end' }}></Col>
          </Row>
          :
           tableUser ?
              <Row>
                <Col></Col>
                <Col>
                </Col>
              </Row>
              :
                <Row>
                  <Col xs="2">
                    {/* <Dropdown id={id} data={dataAirlines} onChange={onChange}/> */}
                  </Col>
                  <Col xs="7">
                    <div className="box-input-search">
                      <input value={search} placeholder={searchPlaceholder} onChange={(e) => this.handleChangeSearch(e.target.value)} className="input-search-user" />
                    </div>
                  </Col>
                </Row>
        }
        <div>
          {loading ?
            this.renderLoading()
            :
            <PaginationProvider
              pagination={
                paginationFactory({
                  custom: custom,
                  page,
                  sizePerPage,
                  totalSize,
                  paginationSize: paginationSize

                })
              }
            >
              {
                ({
                  paginationProps,
                  paginationTableProps
                }) => (
                    <div>
                      <BootstrapTable
                        remote
                        stiped
                        keyField="index"
                        data={data}
                        columns={columns}
                        onTableChange={onTableChange}
                        {...paginationTableProps}
                      />
                      <div>
                        <PaginationListStandalone
                          {...paginationProps}
                        />
                      </div>
                    </div>
                  )
              }
            </PaginationProvider>
          }
        </div>
      </div>
    );
  }
}