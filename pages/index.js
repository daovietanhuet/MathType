import React from 'react';
import {Box} from 'gestalt';
import MathLine from '../components/MathLine';
import InputField from '../components/InputField';
import "gestalt/dist/gestalt.css";
import "./style.css";

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this._handleChange.bind(this);
    this.handleEnter = this._handleEnter.bind(this);
    this.handleBackspace = this._handleBackspace.bind(this);
    this.state = {
      lines: [],
      value: ""
    };
  }

  _handleChange({ value }) {
    this.setState({
      value
    });
  }

  _handleEnter() {
    let lines = this.state.lines;
    lines.push(this.state.value);
    this.setState({
      lines: lines
    })
  }

  _handleBackspace() {

  }

  render() {
    return (
      <Box display='flex'>
        <Box column={9}>
          {this.state.lines.map((ele, index) => {
            return <MathLine ascii={'"' + ele + '"'} key={index}/>
          })}
          <MathLine ascii={'"' + this.state.value + '"'} opacity={0.45}/>
          <InputField onChange={this.handleChange} onEnter={this.handleEnter} onBackspace={this.handleBackspace}/>
        </Box>
      </Box>
    );
  }

}

export default Home;