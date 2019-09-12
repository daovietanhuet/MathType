import React from 'react';
import {Box} from 'gestalt';

class InputField extends React.Component{
    constructor(props) {
        super(props)
        this.handleInput = this._handleInput.bind(this);
        this.handleKeyPress = this._handleKeyPress.bind(this);
        this.handleKeyDown = this._handleKeyDown.bind(this);
    }

    _handleInput(event) {
        this.props.onChange({value: event.target.innerText});
    }

    _handleKeyPress(event) {
        if (event.key === "Enter") {
            event.target.innerHTML = "";
            this.props.onEnter();
        }
    }

    _handleKeyDown(event) {
        if (event.key === "Backspace" && event.target.innerText === "") {
            this.props.onBackspace();
        }
    }

    render() {
        return (
            <Box
                paddingY={2}
            >
                <Box 
                    id="input" 
                    contentEditable 
                    padding={3} 
                    color="lightGray" 
                    suppressContentEditableWarning={true} 
                    placeholder="Type Something Creative... "
                    onInput={this.handleInput}
                    onKeyPress={this.handleKeyPress}
                    onKeyDown={this.handleKeyDown}
                >
                    {/* <span style={{color: "red"}}></span>
                    <span style={{color: "blue"}}></span> */}
                </Box>
            </Box>
        )
    }
}

export default InputField