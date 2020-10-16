import React from 'react';
import Loading from '../../component/Loading/index';


export default class Component extends React.Component {
  render() {
    const { label, handleSubmit, loadingColor='#fff', typeLoading="PulseLoader", loadingSize=14, fontFamily='NunitoSans-Bold', height, loading=false,disabled=false, size,lineHeight, cursor='pointer', alignSelf, align='center', bold, 
      color, width, border, customeClass, bgColor, radius, pLeft, pTop, pRight, pBottom, mLeft, mTop, mRight, mBottom, brdColor, children } = this.props;
    
    let customeStyle = {
      fontFamily:fontFamily,
      fontSize:size,
      alignSelf:alignSelf,
      fontWeight:bold,
      outline:'none',
      cursor:cursor,
      border:`${border}px solid ${brdColor}`,
      marginTop:mTop,
      borderRadius:radius,
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
      height:height,
      backgroundColor:disabled ? '#e2e2e2': !bgColor ? '#a2195b' : bgColor,
      cursor:disabled ? 'no-drop' :'pointer'
    };

    if (loading){
      customeStyle.paddingLeft  = 15;
      customeStyle.paddingRight = 10;
      customeStyle.paddingTop   = 12;
      customeStyle.paddingBottom = 10;
      
      return (
        <div style={customeStyle} className={customeClass ? customeClass :''}>
          <div className="box-botton-loading">
            <Loading 
              type={typeLoading}
              loading={loading}
              color={loadingColor}
              size={loadingSize}
            />
          </div>
        </div>
      );
    }else {
      return (
        <div onClick={handleSubmit && disabled==false ? ()=>handleSubmit():()=>{}} className={customeClass} style={customeStyle}>
          {children}
        </div>
      );
    }
  }
}
