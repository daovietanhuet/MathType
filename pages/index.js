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
    this.edit = React.createRef();
    this.state = {
      position: 0,
      lines: [],
      lineHTMLs: []
    };
  }

  _handleChange = (evt) => {
    let obj = document.createElement("DIV");
    obj.innerHTML = evt.target.value;
    let value = obj.innerText;
    let parts = value.split('"');
    let html = "";

    for(let i = 0 ; i < parts.length; i++) {
      let span = document.createElement("SPAN");
      let div = document.createElement("DIV");
      if (i%2 === 1) {
        span.innerHTML = (i < parts.length -1) ? '\"' + parts[i] + "\"" : "\"" + parts[i];
        span.className = "fomular";
        div.appendChild(span)
        html += div.innerHTML;
      } else html += parts[i];
    }
    let lines = this.state.lines;
    let lineHTMLs = this.state.lineHTMLs;
    lines[this.state.position] = obj.innerText;
    lineHTMLs[this.state.position] = html;
    this.setState({
      lines: lines,
      lineHTMLs: lineHTMLs
    });
  }

  _handleSubmit = (evt) => {
    if(evt.key === 'Enter') {
      let lines = this.state.lines;
      let lineHTMLs = this.state.lineHTMLs;
      lines.splice(this.state.position + 1, 0, "");
      lineHTMLs.splice(this.state.position + 1, 0, "");
      this.setState({
        lines: lines,
        lineHTMLs: lineHTMLs,
        position: this.state.position + 1
      })
      evt.preventDefault();
    }
  }

  _handleKeyDown = (evt) => {
    switch (evt.key) {
      case 'Backspace': 
        if(this.state.lines[this.state.position] === "" || this.state.lineHTMLs[this.state.position] === "") {
          let lines = this.state.lines;
          let lineHTMLs = this.state.lineHTMLs;
          lines.splice(this.state.position, 1);
          lineHTMLs.splice(this.state.position, 1);
          this.setState({
            position: this.state.position - 1 <= 0 ? 0: this.state.position - 1,
            lines: lines || [],
            lineHTMLs: lineHTMLs || []
          })
          evt.preventDefault();
        }
        break;
      default: break;
    }
  }

  _createLines() {
    let lines = this.state.lines.map((ele, index) => {
      return <MathLine ascii={'"' + ele + '"'} key={index}/>
    });
    lines ? lines : [];
    lines[this.state.position] = <EditLine 
        html={this.state.lineHTMLs[this.state.position] || ""}
        value={this.state.lines[this.state.position] || ""}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleSubmit}
        onChange={this.handleChange}
        key={"edit"}
    />
    return lines;
  }

  // componentDidUpdate() {
  //   this.edit.current.scrollTop = this.edit.current.scrollHeight - this.edit.current.clientHeight;
  // }

  render() {
    return (
      <Box display='flex'>
        <Box column={9}>
          <Box maxHeight="85vh" overflow="scrollY" ref={this.edit}>
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