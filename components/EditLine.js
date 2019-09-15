import React from 'react';
import {Box} from 'gestalt';
import ContentEditable from 'react-contenteditable';
import MathLine from './MathLine';

class EditLine extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Box>
                <MathLine ascii={'"' + this.props.value + '"'} opacity={0.45} color="lightgray"/>
                <ContentEditable
                    innerRef={this.props.innerRef}
                    html={this.props.html}
                    disabled={false}      
                    onChange={this.props.onChange} 
                    onKeyDown={this.props.onKeyDown}
                    onKeyPress={this.props.onKeyPress}
                    placeholder="Write Something Creative..."
                    tagName='div' 
                    className="input"
                />
            </Box>
        )
    }
}

export default EditLine;