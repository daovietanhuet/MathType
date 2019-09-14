import React from 'react'
import MathJax from 'react-mathjax3'
 
const MathLine = (props) => {
    return (
        <div style={{
                fontSize: "1rem", 
                padding: "0.5rem", 
                opacity: props.opacity || 1, 
                overflowX: "scroll", 
                backgroundColor: props.color, 
                borderRadius: "0.2rem",
                cursor: "text"
            }}
        >
            <MathJax.Context input='ascii'>
                <div>
                    <MathJax.Node>{props.ascii}</MathJax.Node>
                </div>
            </MathJax.Context>
        </div>
    );
}

export default MathLine;