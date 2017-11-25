import React from 'react';
import ReactSVG from 'react-svg';

export default class Image extends React.Component {
  constructor(props) {
    super(props);

  }

  generateCustomId(props) {
    return props.id || '';
  }

  generateCustomClassName(props) {
    let className = 'image ';
    className += props.class || '';
    className = className.trim();
    return className;
  }

  render () {
    let props = this.props;
    let _customClass = this.generateCustomClassName(props);
    let style = {};
    if (props.isVisible === false || props.value === '') {
      style.display = 'none';
    }
    if (props.onClick) {
      style.cursor = 'pointer';
    }

    let _customId = this.generateCustomId(props);
    let _component;
    if (props.svg) {
      _component = (
        <ReactSVG
          path={props.svg}
          className={`${_customClass}-svg`}
        />
      );
    } else {
      _component = (
        <img
          id={_customId}
          className={`${_customClass}-img`}
          style={style}
          onClick={()=>{
            if (props.onClick) {
              props.onClick();
            }
          }}
          src={props.source}
        />
      );
    }
    return _component;
  }
}