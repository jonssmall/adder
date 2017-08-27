'use strict';
import React from 'react';
import adder from './adder';

const INIT = [0,0,0,0,0,0,0,0];
class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowA: INIT,
      rowB: INIT,
      output: INIT
    };
    // this.addPost = this.addPost.bind(this);
  };

  handleClick() {

  }

  render() {
    return (
      <div>
        <LightRow row={this.state.rowA} />
        <LightRow row={this.state.rowB} />
        <hr/>
        <LightRow row={this.state.output} />
      </div>
    )
  }
}

function LightRow(props) {
  const lights = props.row.map((r, i) => {
    return <div key={i} className={r ? 'light-switch' : 'light-switch on'}></div>
  });
  return (
    <div>
      {lights}
    </div>
  )
}

export default Machine;