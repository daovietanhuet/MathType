import React from 'react';
import {Box} from 'gestalt';
import EditLine from '../components/EditLine';
import MathLine from '../components/MathLine';
import "gestalt/dist/gestalt.css";
import "./style.css";

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this._handleKeyDown.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
    this.handleChange = this._handleChange.bind(this);
    this.createLines = this._createLines.bind(this);
    this.editLine = React.createRef();
    this.state = {
      position: 0,
      lineHTMLs: []
    };
  }

  _handleChange = (evt) => {
    let html = evt.currentTarget.innerText.split('"').map((ele, i, arr) => {
      let span = document.createElement("SPAN");
      if (i%2 === 1) {
        span.innerHTML = (i < arr.length -1) ? '\"' + ele + "\"" : "\"" + ele;
        return span.outerHTML;
      } else return ele;
    }).join("")

    this.setState((state, props) => {
      state.lineHTMLs[this.state.position] = html;
      return ({lineHTMLs: state.lineHTMLs})
    });
  }

  _handleSubmit = async (evt) => {
    if(evt.key === 'Enter') {
      this.setState((state, props) => {
          state.lineHTMLs.splice(this.state.position + 1, 0, "");
          return ({
            lineHTMLs: state.lineHTMLs,
            position: Math.min(state.position + 1, state.lineHTMLs.length - 1)
          })
      }) 
      evt.preventDefault();
    }
  }

  _handleKeyDown = (evt) => {
    switch (evt.key) {
      case 'Backspace': 
        if(this.state.lineHTMLs[this.state.position] === "") {
          this.setState((state, props) => { 
            state.lineHTMLs.splice(this.state.position, 1);
            return ({
              position: Math.max(state.position - 1, 0),
              lineHTMLs: state.lineHTMLs || []
            })
          })
          evt.preventDefault();
        }
        break;
      case 'ArrowUp': 
        this.setState((state, props) => ({
          position:  Math.max(state.position - 1, 0)
        }))
        break;
      case 'ArrowDown': 
        this.setState((state, props) => ({
          position:  Math.min(state.position + 1, Math.max(state.lineHTMLs.length - 1, 0))
        }))
        break;
      default: break;
    }
  }

  _handleEditLine(index) {
    this.setState({
      position: index
    })
  }

  _createLines() {
    let lines = this.state.lineHTMLs.map((ele, index) => {
      return <MathLine html={ele} key={index} onClick={evt => this._handleEditLine(index)} index={"~"}/>
    });
    lines ? lines : [];
    lines[this.state.position] = <EditLine 
        html={this.state.lineHTMLs[this.state.position] || ""}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleSubmit}
        onChange={this.handleChange}
        key={"edit"}
        innerRef={this.editLine}
    />
    return lines;
  }

  render() {
    return (
      <Box display='flex'>
        <Box column={9}>
          <Box>
            {this.createLines()}
          </Box>
        </Box>
        <Box column={3}>
        </Box>
      </Box>
    );
  }

}

export default Home;