import React from 'react';
import {Box} from 'gestalt';
import ContentEditable from 'react-contenteditable';
import MathLine from './MathLine';

class EditLine extends React.Component {
    constructor(props) {
        super(props)
        this.handleKeyPress = this._handleKeyPress.bind(this);
        this.handleKeyDown = this._handleKeyDown.bind(this);
        this.onChange = this._handleChange.bind(this);
        this.contentEditable = React.createRef();
        this.state = {
            value: this.props.value,
            html: this.props.html,
            _value: this.props.value,
            _html: this.props.html
        }
    }

    _handleChange = evt => {
        this.props.onChange(evt)
    }

    _handleKeyPress(evt) {
        this.props.onKeyPress(evt)
    }

    _handleKeyDown(evt) {
        this.props.onKeyDown(evt)
    }

    render() {
        return (
            <Box maxHeight="15vh">
                <MathLine ascii={'"' + this.props.value + '"'} opacity={0.45} color="lightgray"/>
                <ContentEditable
                    innerRef={this.contentEditable}
                    html={this.props.html}
                    disabled={false}      
                    onChange={this.onChange} 
                    onKeyDown={this.handleKeyDown}
                    onKeyPress={this.handleKeyPress}
                    placeholder="Write Something Creative..."
                    tagName='div' 
                    className="input"
                />
            </Box>
        )
    }
}

export default EditLine;