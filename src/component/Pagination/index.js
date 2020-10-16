import React from 'react';
import './pagination.css';
import $ from 'jquery';
export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      dataPerPage: 3,
      upperPageBound: 3,
      lowerPageBound: 0,
      isPrevBtnActive: 'pg-disabled',
      isNextBtnActive: '',
      pageBound: 3
    };
    this.handleClick = this.handleClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnNextClick = this.btnNextClick.bind(this);
    this.btnPrevClick = this.btnPrevClick.bind(this);
    this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
  }

  componentDidUpdate() {
    const { currentPage } = this.props;
    $(".pgcust li a.pg-active").removeClass('pg-active');
    $('.pgcust li#' + currentPage + ' a').addClass('pg-active');
  }

  componentWillMount() {
    this.setPrevAndNextBtnClass(1);
  }

  handleClick(event) {
    const { handleChangePage } = this.props;
    let listid = Number(event.target.id);
    // this.setState({
    //   currentPage: listid
    // });

    $(".pgcust li a.pg-active").removeClass('pg-active');
    $('.pgcust li#' + listid + ' a').addClass('pg-active');

    this.setPrevAndNextBtnClass(listid);
    if (handleChangePage) {
      const { dataPerPage = 3 } = this.props;
      let indexOfLastData = listid * dataPerPage;
      let indexOfFirstData = indexOfLastData - dataPerPage;

      handleChangePage(listid, indexOfFirstData, indexOfLastData);
    }
  }
  setPrevAndNextBtnClass(listid) {
    const { data = [''], dataPerPage } = this.props;
    let totalPage = Math.ceil(data.length / dataPerPage);
    this.setState({ isNextBtnActive: 'pg-disabled' });
    this.setState({ isPrevBtnActive: 'pg-disabled' });
    if (totalPage === listid && totalPage > 1) {
      this.setState({ isPrevBtnActive: 'pg-nav-active' });
    }
    else if (listid === 1 && totalPage > 1) {
      this.setState({ isNextBtnActive: 'pg-nav-active' });
    }
    else if (totalPage > 1) {
      this.setState({ isNextBtnActive: 'pg-nav-active' });
      this.setState({ isPrevBtnActive: 'pg-nav-active' });
    }
  }
  btnIncrementClick() {
    const { handleChangePage } = this.props;
    this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
    this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
    let listid = this.state.upperPageBound + 1;
    // this.setState({ currentPage: listid});
    this.setPrevAndNextBtnClass(listid);
    if (handleChangePage) {
      const { dataPerPage = 3 } = this.props;
      let indexOfLastData = listid * dataPerPage;
      let indexOfFirstData = indexOfLastData - dataPerPage;

      handleChangePage(listid, indexOfFirstData, indexOfLastData);
    }

  }
  btnDecrementClick() {
    const { handleChangePage } = this.props;
    this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
    this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
    let listid = this.state.upperPageBound - this.state.pageBound;
    // this.setState({ currentPage: listid});
    this.setPrevAndNextBtnClass(listid);
    if (handleChangePage) {
      const { dataPerPage = 3 } = this.props;
      let indexOfLastData = listid * dataPerPage;
      let indexOfFirstData = indexOfLastData - dataPerPage;

      handleChangePage(listid, indexOfFirstData, indexOfLastData);
    }
  }
  btnPrevClick() {
    const { handleChangePage, currentPage } = this.props;

    if ((currentPage - 1) % this.state.pageBound === 0) {
      this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
      this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
    }
    let listid = currentPage - 1;
    // this.setState({ currentPage : listid});
    this.setPrevAndNextBtnClass(listid);

    if (handleChangePage) {
      const { dataPerPage = 3 } = this.props;
      let indexOfLastData = listid * dataPerPage;
      let indexOfFirstData = indexOfLastData - dataPerPage;

      handleChangePage(listid, indexOfFirstData, indexOfLastData);
    }

  }
  btnNextClick() {
    const { data, dataPerPage, handleChangePage, currentPage } = this.props;

    if ((currentPage + 1) > this.state.upperPageBound) {
      this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
      this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
    }
    let totalPage = Math.ceil(data.length / dataPerPage);
    let listid = currentPage + 1;
    // if (totalPage==listid){
    // this.setState({ currentPage : listid});
    this.setPrevAndNextBtnClass(listid);

    if (handleChangePage) {
      const { dataPerPage = 3 } = this.props;
      let indexOfLastData = listid * dataPerPage;
      let indexOfFirstData = indexOfLastData - dataPerPage;

      handleChangePage(listid, indexOfFirstData, indexOfLastData);
    }
    // }
  }

  render() {
    const { data = [''], dataPerPage = 3, currentPage } = this.props;
    const { upperPageBound, lowerPageBound, isPrevBtnActive, isNextBtnActive } = this.state;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if (number === 1 && currentPage === 1) {
        return (
          <li key={number} id={number}><a className='pg-active' id={number} onClick={this.handleClick}>{number}</a></li>
        );
      }
      else if ((number < upperPageBound + 1) && number > lowerPageBound) {
        return (
          <li key={number} id={number}><a id={number} onClick={this.handleClick}>{number}</a></li>
        );
      }
    });
    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound) {
      pageIncrementBtn = <li className=''><a onClick={this.btnIncrementClick}> &hellip; </a></li>
    }
    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
      pageDecrementBtn = <li className=''><a onClick={this.btnDecrementClick}> &hellip; </a></li>
    }
    let renderPrevBtn = null;
    if (isPrevBtnActive === 'pg-disabled') {
      renderPrevBtn = <li className={isPrevBtnActive} ><span> Prev </span></li>
    }
    else {
      renderPrevBtn = <li className={isPrevBtnActive}><a onClick={this.btnPrevClick}> Prev </a></li>
    }
    let renderNextBtn = null;
    if (isNextBtnActive === 'pg-disabled') {
      renderNextBtn = <li className={isNextBtnActive}><span> Next </span></li>
    }
    let LastPage = Math.ceil(data.length / dataPerPage);
    if (data == null || data.length == 1 || LastPage == currentPage) {
      renderNextBtn = <li className={'pg-disabled'}><span> Next </span></li>
    }
    else {
      renderNextBtn = <li className={isNextBtnActive}><a onClick={this.btnNextClick}> Next </a></li>
    }
    return (
      <div className="u-row space-between">
        <div className="u-row">
          <div>Showing <b>{data.length == 0 ? 0 : currentPage == 1 ? 1 : (currentPage * parseInt(dataPerPage)) - dataPerPage + 1}</b> to <b>{data.length == 0 ? 0 : data.length <= dataPerPage ? data.length : currentPage == 1 ? dataPerPage : LastPage == currentPage ? data.length : currentPage * dataPerPage}</b> of <b>{data.length == 0 ? 0 : data.length == 0 ? 1 : data.length}</b> entries</div>
        </div>
        <ul className="pgcust">
          {renderPrevBtn}
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          {renderNextBtn}
        </ul>
      </div>
    );
  }
}