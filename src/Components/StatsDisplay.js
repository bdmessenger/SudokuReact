import React from 'react';

function StatsDisplay({x = 0, y = 0, isGameOver, time, mistakes}) {
    const displayTime = () => {
        const dateObj = new Date(time * 1000);
        const hours = dateObj.getUTCHours();
        const minutes = dateObj.getUTCMinutes();
        const seconds = dateObj.getSeconds();

        const timeString = hours.toString().padStart(2, '0') 
        + ':' + minutes.toString().padStart(2, '0') 
        + ':' + seconds.toString().padStart(2, '0');
        
        return timeString;
    };

    return(
        <g transform={`translate(${x},$[y])`}>
            <text x={80} y={70} fontSize="64px" fill={isGameOver ? '#05c75a' : 'white'}>Time: {displayTime()}</text>
            <text x={810} y={70} fontSize="64px" fill="white">Mistakes: {mistakes}</text>
        </g>
    );
}

export default StatsDisplay;