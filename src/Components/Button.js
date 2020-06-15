import React from 'react';

function Button({
    className = '',
    style = {},
    value,
    x, y,
    fontSize = 70,
    fontFamily = "sans-serif",
    fontWeight = "normal",
    width = 130,
    height = 130,
    fill = 'gray',
    textFill = 'black',
    forwardRef = null,
    onClick
}) {
    return(
        <g className={className} ref={forwardRef} style={style}>
            <rect x={x} y={y} width={width} height={height} rx={15} fill={fill}/>
            <text 
                y={y + (height / 2) + 5} x={x + (width / 2) - 3} 
                fontSize={`${fontSize}px`} fontFamily={fontFamily}
                fontWeight={fontWeight} textAnchor="middle" 
                dominantBaseline="middle"
                fill={textFill}
            >{value}</text>
            <rect x={x} y={y} width={width} height={height} rx={15} fill={'transparent'}  onClick={onClick}/>
        </g>
    );
}

export default Button;