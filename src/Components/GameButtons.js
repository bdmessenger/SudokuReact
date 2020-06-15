import React from 'react';

import Button from './Button';

function GameButtons({x = 0, y = 0, newGame, togglePause, gameMode, setMode, isPaused}) {
    return(
        <g transform={`translate(${x},${y})`}>
            <Button 
            x={800} y={1460} 
            width={225} 
            fill={gameMode === 0 ? "#007bff" : "#014b9b"} textFill={gameMode === 0 ? "white" : 'gray'}
            fontSize={50} fontFamily="Arial"
            value={isPaused ? 'Resume' : 'Pause'}
            style={{cursor: gameMode === 0 ? 'pointer' : 'auto'}}
            onClick={togglePause} 
            />

            <Button 
            x={160} y={1460} 
            width={265} 
            fill="#238f3b" textFill="white" 
            fontSize={45} fontFamily="Arial"
            value={gameMode === 0 ? "Practice" : "Time Attack"} 
            style={{cursor: 'pointer'}}
            onClick={() => {
                setMode(mode => mode === 0 ? 1 : 0);
                newGame();
                }
            } 
            />

            <Button 
            x={470} y={1460} 
            width={280} 
            fill="#ffc107" textFill="black" 
            fontSize={45} fontFamily="Arial"
            value="New Game"
            style={{cursor: 'pointer'}}
            onClick={newGame} 
            />
        </g>
    );
}

export default GameButtons;