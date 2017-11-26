import React from 'react';
import Text from './Text.jsx';
import Row from './Row.jsx';
import Column from './Column.jsx';
import Image from './Image.jsx';
import ReactDOM from 'react-dom';
import MobileDetect from 'mobile-detect';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.value = '';
    this.beginEditable = true;
    this.revealHoverText = false;
    this.items = {};
    
    if (props.selection && props.onCancelAdd && props.canEdit) {
      let md = new MobileDetect(window.navigator.userAgent);
      this.isMobile = Boolean(md.mobile());      
    }
  }

  componentDidMount() {
    this.beginEditable = true;
  }

  scrollDown(percentageIncrement = 10, itemsPerView = 3) {
    if (this.scrollLocation === undefined) {
      this.scrollLocation = 0;
    }
    let currentLocation = this.props.selection.length * this.scrollLocation;
    if (currentLocation) {
      currentLocation = Math.floor(currentLocation);
    }
    let scrollAmount = Math.floor(this.props.selection.length * (percentageIncrement / 100)) + itemsPerView;
    let itemNumber = Math.min(currentLocation + scrollAmount, this.props.selection.length - 1);
    if (this.items && this.items[itemNumber]) {
      ReactDOM.findDOMNode(this.items[itemNumber]).scrollIntoView({behavior: 'smooth'});
    }
  }

  scrollUp(percentageIncrement = 10, itemsPerView = 3) {
    if (this.scrollLocation === undefined) {
      this.scrollLocation = 0;
    }
    let currentLocation = this.props.selection.length * this.scrollLocation;
    if (currentLocation) {
      currentLocation = Math.floor(currentLocation);
    }
    let scrollAmount = Math.floor(this.props.selection.length * (percentageIncrement / 100)) + itemsPerView;
    let itemNumber = Math.max(currentLocation - scrollAmount, this.props.selection.length - 1);
    if (this.items && this.items[itemNumber]) {
      ReactDOM.findDOMNode(this.items[itemNumber]).scrollIntoView({behavior: 'smooth'});
    }
  }

  render () {
    let props = this.props;
    let _component;
    let _value;
    
    if (props.value === undefined || props.value === false) {
      if (props.defaultValue === undefined || props.defaultValue === false) {
        _value = this.value || '';
      } else {
        _value = this.value || props.defaultValue;
      }
    } else {
      _value = this.value || props.value;
    }
    
    if (props.maskValue) {
      _value = props.maskValue(_value);
    }
    
    let _input;
    let _customClass = 'inputField';
    let _inputClass = 'text-box';
    let isValid;
    if (props.class) {
      _customClass += ` ${props.class}`;
    }
    if (props.validation && props.inlineValidation && (props.isRequired || (props.value || this.value))) {
      props.validation(props.field, (props.value || this.value || props.defaultValue), (validatedValue)=>{
        if (validatedValue.isValid) {
          isValid = true;
        } else {
          isValid = false;
        }
      });
    }
    if (isValid) {
      _customClass += ' valid';
      _inputClass += ' valid';
    } else if (isValid === false) {
      _inputClass += ' invalid';
      _customClass += ' invalid';
    }

    if (this.focused) {
      _customClass += ' focus';
      _inputClass += ' focus';
    }
    if (props.canEdit(props.field)) {
      _customClass += ' editing';
    }

    if (props.hasEditRights) {
      if (props.isRequired && (_value === undefined || _value === '')) {
        _inputClass += ' missing-required';
      }
    }

    if (props.isVisible) {
      if (props.hasEditRights) {
        if (props.canEdit(props.field) || (this.beginEditable && props.beginEditable)) {
          if (props.selection) {            
            _input = (
              <Column class={`${props.canEdit ? 'input selected' : 'input'}`} key={'input'}>
                <Row
                  class={'selection-list'}
                  ref={(element) => {
                    if (element) {
                      this.list = element;
                    }
                  }}
                  onScroll={props.controlScroll ? (e)=>{
                    if (e && e.target && e.target.scrollTop && e.target.scrollHeight) {
                      this.scrollLocation = e.target.scrollTop / e.target.scrollHeight;
                    }
                  }: undefined}
                  onMouseLeave={()=> {
                    if (props.onCancelAdd) {
                      props.onCancelAdd();
                    }
                  }}
                >
                  {props.selection.map((item, idx) => {
                    let lastItem = idx === props.selection.length - 1;
                    let scrollTo = false;
                    return (
                      <Column 
                        class={'selection-item'}  
                        key={`selection-${idx}`} 
                        ref={(element)=> {
                          if ((lastItem && element && props.scrollToLastElement !== false)) {
                            ReactDOM.findDOMNode(element.input.parentNode).scrollIntoView({behavior: 'smooth'});
                          }
                          if (element && props.controlScroll) {
                            this.items[idx] = element;
                          }
                        }}
                        onClick={()=>{
                          if (props.onEdit) {
                            props.onEdit(props.field, item);
                          }
                          if (props.validation) {
                            props.validation(props.field, item, (validated)=>{
                              if (validated.isValid && props.onAdd) {
                                props.onAdd(props.field, validated.validatedValue);
                              } else {
                                if (props.displayNotification) {
                                  props.displayNotification(props.field, validated.reason);
                                }
                              }
                            });
                          } else if (props.onAdd) {
                            props.onAdd(props.field, item);
                          }
                          this.value = props.maskValue ? props.maskValue(item) : item;
                          if (props.onCancelAdd) {
                            props.onCancelAdd();
                          }
                        }}>
                          <Text
                            isVisible={true}
                            value={props.maskValue ? props.maskValue(item) : item}
                          />
                      </Column>
                    );
                })}
                </Row>
              </Column>
            );
            _component = _input;
          } else {
            if (props.textArea) {
              _input = (
                <Column 
                  class={'input'} 
                  key={'input'}
                >
                  <textarea 
                    className={_inputClass + ' textarea'}
                    placeholder={props.defaultValue || props.placeholder || ''}
                    value={this.value}
                    disabled={props.disabled}
                    style={{
                      width: '100%',
                      maxWidth: 'inherit',
                      resize: 'none'
                    }}
                    onChange={(e)=>{
                      this.value = e.target.value;
                      if (props.maskInput) {
                        this.value = props.maskInput(this.value);
                      }
                      if (props.validation) {
                        props.validation(props.field, this.value, (validatedValue)=>{
                          if (validatedValue) {
                            this.validatedValue = validatedValue.validatedValue;
                          } else {
                            this.validatedValue = false;
                          }
                        });
                      }
                      if (props.onEdit) {
                        props.onEdit(props.field, this.value);
                      }
                      this.forceUpdate();
                    }} 
                    onKeyDown={(event)=>{
                      if (props.onKeyDown && event) {
                        props.onKeyDown(event.key);
                      }
                    }}
                    onBlur={(e)=>{
                      this.focused = false;
                      this.forceUpdate();
                      if (props.validation && props.inlineValidation) {
                        props.validation(props.field, this.value, (validated)=>{
                          if (validated.isValid) {
                            if (props.maskValue) {
                              this.value = props.maskValue(validated.validatedValue);
                            } else {
                              this.value = validated.validatedValue;
                            }
                          }
                          this.forceUpdate();
                        });
                      }
                      if (props.onBlur) {
                        props.onBlur(this.value);
                      }
                    }}
                    onFocus={(e)=>{
                      if (props.onFocus) {
                        props.onFocus(e);
                      }
                      this.focused = true;
                      this.forceUpdate();
                    }}
                  />
                </Column>
              );
            } else {
              _input = (
                <Column 
                  class={'input'} 
                  key={'input'}
                >
                  <input 
                    className={_inputClass}
                    autoFocus={Boolean(props.autoFocus)}
                    type={props.isPassword ? 'password' : 'text'} 
                    placeholder={props.defaultValue || props.placeholder || ''}
                    value={this.value}
                    disabled={props.disabled}
                    style={{
                      width: '100%',
                      maxWidth: 'inherit'
                    }}
                    onChange={(e)=>{
                      this.value = e.currentTarget.value;
                      if (props.maskInput) {
                        this.value = props.maskInput(this.value);
                      }
                      if (props.validation) {
                        props.validation(props.field, this.value, (validatedValue)=>{
                          if (validatedValue) {
                            this.validatedValue = validatedValue.validatedValue;
                          } else {
                            this.validatedValue = false;
                          }
                        });
                      }
                      if (props.onEdit) {
                        props.onEdit(props.field, this.value);
                      }
                      this.forceUpdate();
                    }}
                    onKeyDown={(event)=>{
                      if (props.onKeyDown && event) {
                        props.onKeyDown(event.key);
                      }
                    }}
                    onBlur={(e)=>{
                      this.focused = false;
                      this.forceUpdate();
                      if (props.validation && props.inlineValidation) {
                        props.validation(props.field, this.value, (validated)=>{
                          if (validated.isValid) {
                            if (props.maskValue) {
                              this.value = props.maskValue(validated.validatedValue);
                            } else {
                              this.value = validated.validatedValue;
                            }
                          } else {
                            isValid = false;
                          }
                          this.forceUpdate();
                        });
                      }
                      if (props.onBlur) {
                        props.onBlur(this.value);
                      }
                    }}
                    onFocus={(e)=>{
                      if (props.onFocus) {
                        props.onFocus(e);
                      }
                      this.focused = true;
                      this.forceUpdate();
                    }}
                  />
                </Column>
              );
            }
            _component = _input;
          }       
        } else if (props.hasEditRights && props.isEditable && props.onToggleEdit) {          
          
          _input = (
            <Column class={'input'} key={'input'}>
              <Text
                class={'input-field-text'}
                isVisible={true}
                value={_value || '--------'}
                onClick={()=>{
                  if (props.onDisplayInstructions) {
                    props.onDisplayInstructions(props.field);
                  }
                  props.onToggleEdit(props.field);
                }}
              />
            </Column>
          );

          _component = _input;
        } else {
         
          _input = (
            <Column class={'input'} key={'input'}>
              <Text
                class={'input-field-text'}
                isVisible={true}
                value={props.title ? props.title : _value}
                onClick={false}
              />
            </Column>
          );
          _component = _input;
        }
      } else {
        
        _input = (
          <Column class={'input'} key={'input'}>
            <Text
              class={'input-field-text'}
              isVisible={true}
              value={props.title ? props.title : _value}
              onClick={false}
            />
          </Column>
        );
        _component = _input;
      }
    }
    return (
      <Row class={_customClass}>
        {_component}
      </Row>
    );
  }
}