import React from 'react';
import {Box} from 'gestalt';
import MathLine from '../components/MathLine';
import "gestalt/dist/gestalt.css";

class Preview extends React.Component {
    createLines() {
        return [`Ta co "x^2 - 5x + 6 = 0 <=> [(x = 2),(x = 3):}"`].map((ele, index) => {
          return <MathLine html={ele} key={index} fontSize="80%"/>
        });
    }
    
    render() {
        return (
            <Box>
                {this.createLines()}
            </Box>
        )
    }
}

export default Preview