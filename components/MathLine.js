import React from 'react'
import MathJax from 'react-mathjax3'
 
const MathLine = (props) => {
    return (
        <div style={{fontSize: "1.5rem", padding: "0.5rem", opacity: props.opacity || 1, overflow: "hidden"}}>
            <MathJax.Context input='ascii'>
                <div>
                    <MathJax.Node>{props.ascii}</MathJax.Node>
                </div>
            </MathJax.Context>
        </div>
    );
}

export default MathLine;