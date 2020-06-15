import React from 'react';

import Button from './Button';

function InputPads({x = 0, y = 0, keyRefs, inputDigitByButton}){
    return(
        <g transform={`translate(${x},${y})`}>
            {
                [1,2,3,4,5,6,7,8,9].map((digit, i) => {
                    return (
                    <Button 
                        id={`digitKey_${digit}`} 
                        key={`digitKey_${digit}`} 
                        value={digit} 
                        x={(130 * i) + 20} y={1320}
                        width={120}
                        fontWeight="bold"
                        onClick={() => inputDigitByButton(i, digit)}
                        forwardRef={keyRefs.current[i]}
                    />
                    );
                })
            }
        </g>
    );
}

export default InputPads;