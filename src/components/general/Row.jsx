import React from 'react';

export default class Row extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    const props = this.props;
    let style = {
      display: props.isVisible === false ? 'none' : 'flex'
    }
    if (props.onClick || props.onMouseUp) {
      style.cursor = 'pointer';
    }
    if (props.isVisible === false) {
      style.display = 'none';
    }
    return (
      <div 
        ref={(element) => {
          if (element && props.onScroll) {
            element.addEventListener('scroll', (e) => props.onScroll(e));
          }
        }}
        style={style}
        className={props.class ? `row ${props.class}` : 'row'}
        onMouseLeave={props.onMouseLeave ? ()=>{
          props.onMouseLeave();
        }: undefined}
      >
        {props.children}
      </div>
    );
  }
}