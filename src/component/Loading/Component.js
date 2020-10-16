import React from 'react';
import PropTypes from 'prop-types';
// import { css } from '@emotion/core';
import { SyncLoader, PulseLoader } from 'react-spinners';
// import ClipLoader from 'react-spinners/ClipLoader';
 

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    const { display='block',type="", className='sweet-loading', margin='0 auto', brdColor, sizeUnit='px', size=15, color='#123abc', loading = false }= this.props;
    // let override = css`
    //   display:${display};
    //   margin: ${margin};
    //   border-color: ${brdColor};
    // `;
    if (type=="PulseLoader"){
      return(
        <div className={className}>
          <PulseLoader
            // css={override}
            sizeUnit={sizeUnit}
            size={size}
            color={color}
            loading={loading}
          />
        </div> 
      );
    }else {
      return (
        <div className={className}>
          <SyncLoader
            // css={override}
            sizeUnit={sizeUnit}
            size={size}
            color={color}
            loading={loading}
          />
        </div> 
      );
    }
  }
}

Component.propTypes = {
  display: PropTypes.string, 
  className : PropTypes.string, 
  margin: PropTypes.string, 
  brdColor: PropTypes.string, 
  sizeUnit: PropTypes.string, 
  size: PropTypes.number, 
  color: PropTypes.string,
  loading: PropTypes.bool
};
 