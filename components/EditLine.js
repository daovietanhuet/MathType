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
            <Box id="input_line" ref={this.props.innerRef} marginBottom={3}>
                <MathLine html={this.props.html} opacity={0.45} color="lightgray"/>
                <ContentEditable
                    innerRef={this.contentEditable}
                    html={this.props.html}
                    disabled={false}      
                    onChange={this.onChange} 
                    onKeyDown={this.handleKeyDown}
                    onKeyPress={this.handleKeyPress}
                    placeholder="Nhập ở đây..."
                    tagName='div' 
                    className="input"
                />
            </Box>
        )
    }
}

export default EditLine;