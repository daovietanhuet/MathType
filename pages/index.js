import React from 'react';
import {Box, Divider} from 'gestalt';
import { FaPrint, FaFilePdf, FaSearch } from 'react-icons/fa';
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
    this.handleArray = this._handleArray.bind(this);
    this.handleTitleChange = this._handleTitleChange.bind(this);
    this.handleTitleBlur = this._handleTitleBlur.bind(this);
    this.editLine = React.createRef();
    this.state = {
      position: 0,
      lineHTMLs: [""],
      title: "Tài liệu không có tiêu đề"
    };
  }

  componentDidMount() {
    localStorage.setItem('docs', JSON.stringify([]));
  }

  _handleArray = (newPos, pos, number, value) => {
    this.setState((state, props) => { 
      if(pos !== null && pos !== undefined) value !== null ? state.lineHTMLs.splice(pos, number, value) : state.lineHTMLs.splice(pos, number);
      return ({
        position: newPos,
        lineHTMLs: state.lineHTMLs.length === 0 ? [""] : state.lineHTMLs
      })
    })
    if(pos !== null && pos !== undefined) {
      let docs = JSON.parse(localStorage.getItem('docs'));
      if(docs.length === 50) docs.shift();
      docs.push(this.state.lineHTMLs)
      localStorage.setItem('docs', JSON.stringify(docs));
    }
  }

  _handleChange = (evt) => {
    let html = evt.currentTarget.innerText.split('"').map((ele, i, arr) => {
      if (i%2 === 0) return ele;
      let span = Object.assign(document.createElement("SPAN"), {innerHTML: (i < arr.length -1) ? '\"' + ele + "\"" : "\"" + ele});
      return span.outerHTML;
    }).join("")

    this.handleArray(this.state.position, this.state.position, 1, html)
  }

  _handleSubmit = async (evt) => {
    if(evt.key === 'Enter') {
      this.handleArray(Math.min(this.state.position + 1, this.state.lineHTMLs.length), this.state.position + 1, 0, "")
      evt.preventDefault();
    }
  }

  _handleKeyDown = (evt) => {
    switch (evt.key) {
      case 'Backspace': 
        if(this.state.lineHTMLs[this.state.position].trim() === ""){
          this.handleArray(Math.max(this.state.position - 1, 0), this.state.position, 1, null)
          evt.preventDefault();
        }
        break;
      case 'ArrowUp': 
        this.handleArray(Math.max(this.state.position - 1, 0))
        break;
      case 'ArrowDown': 
        this.handleArray(Math.min(this.state.position + 1, Math.max(this.state.lineHTMLs.length - 1, 0)))
        break;
      default: break;
    }
  }

  _createLines() {
    return this.state.lineHTMLs.map((ele, index) => {
      if(index === this.state.position) return <EditLine 
          html={this.state.lineHTMLs[this.state.position] || ""}
          onKeyDown={this.handleKeyDown}
          onKeyPress={this.handleSubmit}
          onChange={this.handleChange}
          key={"edit"}
          innerRef={this.editLine}
      />
      else return <MathLine html={ele} key={index} onClick={evt => this.handleArray(index)} index={"~"}/>
    });
  }

  _handleTitleChange = (evt) => {
    this.setState({title: evt.target.value})
    localStorage.setItem('title', evt.target.value)
  }

  _handleTitleBlur = (evt) => {
    if(!evt.target.value || evt.target.value.trim() === "") {
      this.setState({title: "Tài liệu không có tiêu đề"})
      localStorage.setItem('title', "Tài liệu không có tiêu đề")
    }
  }

  render() {
    return (
      <Box display='flex'>
        <Box column={9}>
          <Box paddingY={3} paddingX={4} display="flex">
            <Box flex="grow">
              <input
                className="title" 
                value={this.state.title} 
                placeholder="Tài liệu không có tiêu đề" 
                onChange={this.handleTitleChange} 
                onBlur={this.handleTitleBlur}
              ></input>
            </Box>
            <Box marginRight={3}><FaSearch color="#4a90e2"/></Box>
            <Box marginRight={3}><FaPrint color="#4a90e2"/></Box>
            <Box marginRight={3}><FaFilePdf color="#4a90e2"/></Box>
          </Box>
          <Divider/>
          <Box marginTop={1}>
            {this.createLines()}
            <Box height={"300px"}></Box>
          </Box>
        </Box>
        <Box column={3}>
        </Box>
      </Box>
    );
  }
}

export default Home;