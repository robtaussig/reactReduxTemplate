import React from 'react';

export default class Text extends React.Component {
  constructor(props) {
    super(props);

  }

  generateCustomId(props) {
    return props.id || '';
  }

  generateCustomClassName(props) {
    let className = 'text ';
    className += props.class || '';
    className = className.trim();
    return className;
  }

  render () {
    let props = this.props;
    let _customClass = this.generateCustomClassName(props);
    let _customId = this.generateCustomId(props);
    let _value = '';
    if (props.value) {
      _value = String(props.value).trim();
    }
    if (props.truncate) {
      if (_value.length > props.truncate) {        
        _value = `${_value.slice(0, props.truncate)}...`;        
      }
    }
    if (props.breakNewLine) {
      _value = _value.split('\n').map(el => {
        return ([<div style={{display: 'inline'}}>{el}</div>,<br/>]);
      });
    }
    if (props.label || props.truncate) {
      return (
        <div
          id={_customId}
          className={_customClass}           
          title={props.label || _value}
          onClick={props.onClick ? ()=>{
            props.onClick(_value);
          } : undefined}
        >
          {_value}
        </div>
      );
    } else {
      return (
        <div
          id={_customId}
          className={_customClass}           
          onClick={props.onClick ? ()=>{
            props.onClick(_value);
          } : undefined}
        >
          {_value}
        </div>
      );
    }
  }
}