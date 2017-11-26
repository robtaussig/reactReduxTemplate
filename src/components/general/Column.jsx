import React from 'react';

export default class Column extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  render () {
    const props = this.props;
    let style = {
      
    }
    if (props.onClick || props.onMouseUp) {
      style.cursor = 'pointer';
    }
    if (props.isVisible === false) {
      style.display = 'none';
    }
    return (
      <div 
        ref={(element)=>{this.element = element;}}
        onScroll={(el)=>{
          if (props.onScroll) {
            props.onScroll(this.element);
          }
        }}
        style={style}
        className={props.class ? `column ${props.class}` : 'column'}
        onMouseUp={props.onMouseUp ? (e)=>{
          props.onMouseUp(e);
        }: undefined}
        onClickCapture={(e)=>{
          if (props.onClick) {
            props.onClick(e);
          }
        }}
      >
        {props.children}
      </div>
    );
  }
}