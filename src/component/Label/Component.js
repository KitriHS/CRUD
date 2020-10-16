import React from 'react';
import PropTypes from 'prop-types';

export default class Component extends React.Component {
  render() {
    const { size,lineHeight,fontFamily='', alignSelf, lSpacing='0.5px',underline, align, mTop, mRight, mLeft, bold, 
      color, width, mBottom=0,pTop, pRight, pLeft, pBottom, children, customeClass, cursor } = this.props;
    let customStyle = {
      fontFamily:fontFamily,
      fontSize:size,
      cursor:cursor,
      alignSelf:alignSelf,
      fontWeight:bold,
      marginTop:mTop,
      marginRight:mRight,
      marginBottom:mBottom,
      marginLeft:mLeft,
      paddingTop:pTop,
      paddingRight:pRight,
      paddingBottom:pBottom,
      paddingLeft:pLeft,
      lineHeight:lineHeight,
      textAlign:align,
      color:color,
      width:width,
      textDecoration:underline ? 'underline' : 'none',
      letterSpacing:lSpacing
    }

    return (
      <p className={customeClass} style={customStyle}>
        {children}
      </p>
    );
  }
}

Component.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.string,
  ]),
  customeClass:PropTypes.string,
  mTop:PropTypes.number,
  mRight:PropTypes.number,
  mBottom:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mLeft: PropTypes.number,
  left:PropTypes.number,
  pTop:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  pRight:PropTypes.number,
  pBottom:PropTypes.number,
  pLeft: PropTypes.number,
  cursor:PropTypes.string,
  align:PropTypes.string,
  color:PropTypes.string,
  alignSelf:PropTypes.string,
  lineHeight:PropTypes.number,
  lSpacing:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  bold:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  size:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  width:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};
