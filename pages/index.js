import React from 'react';
import {Box} from 'gestalt';
import ContentEditable from 'react-contenteditable';
import MathLine from '../components/MathLine';
import "gestalt/dist/gestalt.css";
import "./style.css";

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this._handleChange.bind(this);
    this.handleKeyDown = this._handleKeyDown.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      lines: [],
      lineHTMLs: [],
      value: "",
      html: ""
    };
  }

  _handleChange = evt => {
    let obj = document.createElement("DIV");
    obj.innerHTML = evt.target.value;
    let value = obj.innerText;
    let parts = value.split('"');
    let html = obj.innerHTML;
    //console.log(parts, obj.innerHTML)
    // let html = "";
    // for(let i = 0 ; i < parts.length; i++) {
    //   html += (i%2 == 0 && parts[i] !== "") ? '<span class="string">' + parts[i] + '</span>': '<span class="fomular">' + parts[i] + '</span>';
    //   if(i != parts.length-1) html += '"';
    // }
    this.setState({
      value: obj.innerText,
      html: html
    });
  };

  _handleSubmit = evt => {
    if(evt.key === 'Enter') {
      this.setState({
        lines: [...this.state.lines, this.state.value],
        lineHTMLs: [...this.state.lineHTMLs, this.state.html],
        value: "",
        html: ""
      })
      evt.preventDefault();
    }
  }

  _handleKeyDown = evt => {
    switch (evt.key) {
      case 'Backspace': 
        if(this.state.value === "") {
          evt.preventDefault();
          let lines = this.state.lines;
          let lineHTMLs = this.state.lineHTMLs;
          this.setState({
            value: (lines.pop() || "") ,
            html: (lineHTMLs.pop() || "") ,
            lines: lines || [],
            lineHTMLs: lineHTMLs || []
          })
        }
        break;
      default: break;
    }
  }

  render() {
    return (
      <Box display='flex'>
        <Box column={9}>
          <Box maxHeight="85vh" overflow="scrollY">
            {this.state.lines.map((ele, index) => {
              return <MathLine ascii={'"' + ele + '"'} key={index}/>
            })}
          </Box>
          <Box maxHeight="15vh" height="15vh">
            <MathLine ascii={'"' + this.state.value + '"'} opacity={0.45} color="lightgray"/>
            <ContentEditable
              innerRef={this.contentEditable}
              html={this.state.html}
              disabled={false}      
              onChange={this.handleChange} 
              onKeyDown={this.handleKeyDown}
              onKeyPress={this.handleSubmit}
              placeholder="Write Something Creative..."
              tagName='div' 
              className="input"
            />
          </Box>
        </Box>
        <Box column={3}>

        </Box>
      </Box>
    );
  }

}

export default Home;