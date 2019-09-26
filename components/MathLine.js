import React from 'react'
import MathJax from 'react-mathjax3'
 
class MathLine extends React.Component {
    constructor(props) {
        super(props)
        this.handleHTML = this._handleHTML.bind(this);
        this.state = {
            div: null
        }
    }

    _handleHTML (html) {
        if(this.state.div){
            this.state.div.innerHTML = html
            return '"' + this.state.div.innerText + '"';
        }
        return ""
    }

    componentDidMount() {
        let div = document.createElement('DIV');
        this.setState({div : div})
    }

    render() {
        let props = this.props;
        return (
            <div style={{
                    fontSize: props.fontSize || "1rem", 
                    padding: "0.3rem", 
                    opacity: props.opacity || 1, 
                    overflowX: props.overflowX || "hidden", 
                    backgroundColor: props.color, 
                    borderRadius: "0.2rem",
                    cursor: "text",
                    paddingLeft: "2rem",
                    minHeight: "1.5rem"
                }}
                onClick = {props.onClick}
                className="math_line"
                index={this.props.index}
            >
                <MathJax.Context input='ascii'>
                    <div>
                        <MathJax.Node>{
                           this.handleHTML(props.html)
                        }</MathJax.Node>
                    </div>
                </MathJax.Context>
            </div>
        );
    }
}

export default MathLine;