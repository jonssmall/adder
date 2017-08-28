'use strict';
import React from 'react';
import adder from './adder';

class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: [0,0,0,0,0,0,0,0],
      b: [0,0,0,0,0,0,0,0],
      output: [0,0,0,0,0,0,0,0],
      overflow: false
    };
    this.toggleLight = this.toggleLight.bind(this);
  };

  toggleLight(r,i) {
    const row = this.state[r];    
    row[i] = !row[i];
    this.setState(row);    
    const machineOutput = adder({a: this.state.a, b: this.state.b});        
    this.setState({output: machineOutput.map(o => o.sumOut), overflow: machineOutput[7].carryOut});    
  }
  
  render() {    
    return (
      <div>
        <LightRow row="a" input={this.state.a} clickHandler={this.toggleLight} />
        <LightRow row="b" input={this.state.b} clickHandler={this.toggleLight} />
        <hr/>
        <LightRow input={this.state.output} />
        Overflow: <br/> 
        <Overflow on={this.state.overflow}/>
      </div>      
    )
  }
}

function LightRow(props) {
  const lights = props.input.map((r, i) => {
    const attrs = {
      key: i,
      className: r ? 'light-switch' : 'light-switch on',
      onClick: props.clickHandler ? props.clickHandler.bind(this,props.row,i) : null //find a better way for answer row
    };
    return <div {...attrs}></div>
  });
  return (
    <div>
      {lights.reverse()}
    </div>
  )
}

function Overflow(props) {
  return <div className={props.on ? 'light-switch' : 'light-switch on'} ></div>
}

// TODO: figure out how to use HOC
function clickRow(WrappedComponent) {
  return function(props) {
    <WrappedComponent {...props} onClick={console.log('hi')} />
  }
}

export default Machine;