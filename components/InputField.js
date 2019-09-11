import React from 'react';
import {Box} from 'gestalt';

class InputField extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            focus: false
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
                    onInput={(e) => {this.props.onChange({value: e.target.innerText})}}
                >
                    {/* <span style={{color: "red"}}></span>
                    <span style={{color: "blue"}}></span> */}
                </Box>
            </Box>
        )
    }
}

export default InputField