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
    this.state = {
      value: ""
    };
  }

  _handleChange({ value }) {
    this.setState({
      value
    });
  }

  render() {
    return (
      <Box display='flex'>
        <Box column={8}>
          <MathLine ascii={'"' + this.state.value + '"'} opacity={0.45}/>
          <InputField onChange={this.handleChange}/>
        </Box>
      </Box>
    );
  }

}

export default Home;