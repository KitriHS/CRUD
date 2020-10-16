import React, {PureComponent} from 'react';
import { Row, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

class Table extends React.PureComponent {
  constructor(props){
      super (props)
      this.state = {}
  }

  render() {
    const { SearchBar } = Search;
    const pageOptions = {
      paginationSize: 10,
      pageStartIndex: 1,
      withFirstAndLast: false,
      hideSizePerPage: true, 
      hidePageListOnlyOnePage: true,
    };
    return (
      <div>
          <ToolkitProvider
            keyField="id"
            data={ this.props.data}
            columns={ this.props.columns }
            search
          >
            {
              props => (
                <div style={{marginTop: 10, marginBottom: 50}}>
                  <SearchBar 
                    className="custome-search-field"
                    placeholder="Search In Here"
                    { ...props.searchProps } 
                  />
                  <hr />
                  <BootstrapTable
                    pagination={ paginationFactory(pageOptions) }
                    striped
                    { ...props.baseProps }
                  />
                </div>
              )
            }
          </ToolkitProvider>
      </div>
    )
  }
}
export default Table