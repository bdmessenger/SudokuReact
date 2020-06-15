import React, { useState, useEffect, useRef, createRef } from "react";
import useEventListener from '../useEventListener';
import sudoku from '../sudoku.json';

import Board from './Board';
import InputPads from './InputPads';
import GameButtons from './GameButtons';
import StatsDisplay from './StatsDisplay';


function convertStrToSudokuArray(str) {
    const modifiedStr = str.replace(/[0]/g, " ");
    const arr = modifiedStr.split("");
    const result = [];
    while (arr.length) {
      result.push(arr.splice(0, 9));
    }
  
    return result;
}
  
function array_compare(a1, a2) {
    if(a1.length !== a2.length) return false;

    for(var i in a1) {
        if(a1[i] instanceof Array && a2[i] instanceof Array) {
            if(!array_compare(a1[i], a2[i])) return false;
        } else if(a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}


function Sudoku() {
    //----------------States------------------------//
    const [dataset, setDataset] = useState(null);
    const [solution, setSolution] = useState(null);
    const [tileSelected, setTileSelect] = useState(null);
    const [isPaused, setPause] = useState(true);
    const [time, setTime] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isGameOver, setGameOver] = useState(false);
    const [gameMode, setMode] = useState(0);

    //----------------Refs--------------------------//
    const puzzleId = useRef(null);
    const isKeyPress = useRef(false);
    const keyRefs = useRef(Array.from({length:9},()=> createRef()));
    const dataRef = useRef({
        time: 0,
        mistakes: 0
    });

    //--------------Functions----------------------//
    const newGame = () => {
        setGameOver(false);
        let randomId;
        const {puzzles, solutions } = sudoku;
        do{
            randomId = Math.floor(Math.random() * Math.floor(puzzles.length));
        } while(randomId === puzzleId.current);

        puzzleId.current = randomId;

        const problem = convertStrToSudokuArray(puzzles[randomId]);
        const solution = convertStrToSudokuArray(solutions[randomId]);

        setTileSelect(null);
        setDataset(problem);
        setSolution(solution);
        setTime(0);
        dataRef.current = {
            time: 0,
            mistakes: 0
        };
        setMistakes(0);
        setPause(false);
    };

    const togglePause = () => {
        if(!isGameOver && gameMode === 0) {
            if(!isPaused) setTileSelect(null);
            setPause(pause => !pause);
        }
    };

    const selectTile = e => {
        if(e.target && !isPaused){
            const [row, tile] = e.target.id.replace(/[a-z_]/g, '').split("").map(num => num - 1);

            if(solution[row][tile] === dataset[row][tile]) return;

            if (tileSelected && tileSelected === e.target.id) {
                setTileSelect(null);
                return;
            }

            setTileSelect(e.target.id);

            if(gameMode === 1) {
                keyRefs.current.forEach(ref => {
                ref.current.children[0].style.fill = "gray";
                ref.current.children[2].style.cursor = 'auto';
                });

                const remainingDigits = ['1','2','3','4','5','6','7','8','9'];
                let index = -1;

                for(let i = 0; i < 9; i++) {
                    if(dataset[row][i] !== '') {
                        index = remainingDigits.indexOf(dataset[row][i]);
                        if(index !== -1) remainingDigits.splice(index, 1);
                    }

                    if(dataset[i][tile] !== '') {
                        index = remainingDigits.indexOf(dataset[i][tile]);
                        if(index !== -1) remainingDigits.splice(index, 1);
                    }
                }

                let square;

                switch(row) {
                case 0:
                case 1:
                case 2:
                    if(tile < 3) square = [0, 0];
                    else if (tile < 6) square = [0, 3];
                    else square = [0, 6];
                    break;
                case 3:
                case 4:
                case 5:
                    if(tile < 3) square = [3, 0];
                    else if (tile < 6) square = [3, 3];
                    else square = [3, 6];
                    break;
                case 6:
                case 7:
                case 8:
                    if(tile < 3) square = [6, 0];
                    else if (tile < 6) square = [6, 3];
                    else square = [6, 6];
                    break;
                default:
                    break;
                }

                for(let r = square[0]; r < square[0] + 3; r++) {
                for(let j = square[1]; j < square[1] + 3; j++) {
                    if(dataset[r][j] !== '') {
                    index = remainingDigits.indexOf(dataset[r][j]);
                    if(index !== -1) remainingDigits.splice(index, 1);
                    }
                }
                }

                remainingDigits.map(digit => parseInt(digit) - 1).forEach(index => {
                    keyRefs.current[index].current.children[0].style.fill = "white";
                    keyRefs.current[index].current.children[2].style.cursor = 'pointer';
                });
            } else {
            keyRefs.current.forEach(ref => {
                ref.current.children[0].style.fill = "white";
                ref.current.children[2].style.cursor = 'pointer';
            });
            }

        }
    };

    const inputDigit = e => {
        if(e.keyCode && tileSelected) {
            const key = e.keyCode;

            if((57 >= key && key >= 49) || (105 >= key && key >= 97)) {
                const digit = String.fromCharCode((96 <= key && key <= 105) ? key-48 : key);
                const [row, tile] = tileSelected.replace(/[a-z_]/g, '').split("").map(num => num - 1);
                const data = [...dataset]
                data[row][tile] = digit;

                if(data[row][tile] === solution[row][tile]) setTileSelect(null);
                else {
                  setMistakes(mistakes => mistakes + 1);
                  dataRef.current.mistakes += 1;
                }
                setDataset(data);
            }
        }
    };

    const inputDigitByButton = (i, digit) => {
        if(keyRefs.current[i].current.children[0].style.fill === "white" && tileSelected) {
          const [row, tile] = tileSelected.replace(/[a-z_]/g, '').split("").map(num => num - 1);
          const data = [...dataset];
          data[row][tile] = digit.toString();
          if(data[row][tile] === solution[row][tile]) setTileSelect(null);
          else {
            setMistakes(mistakes => mistakes + 1);
            dataRef.current.mistakes += 1;
          }
          setDataset(data);
        }
    };

    //------------React-Effects------------------//

    useEffect(() => {
        newGame();
    }, []);

    useEffect(() => {
        let interval;
        if(!isGameOver && !isPaused && gameMode === 0 && dataset) {
            interval = setInterval(() => {
                setTime(time => time + 1);
                dataRef.current.time += 1;
            }, 1000);
        }
    
        return () => {
            clearInterval(interval);
        }
    }, [dataset, isPaused, isGameOver, gameMode]);

    useEffect(() => {
        if(!tileSelected) {
            keyRefs.current.forEach(ref => {
                ref.current.children[0].style.fill = "gray";
                ref.current.children[2].style.cursor = 'auto';
            });
        }
    }, [tileSelected]);

    useEffect(() => {
        if (dataset && array_compare(dataset, solution)) {
          setPause(true);
          setGameOver(true);
    
          if(gameMode === 0) {
            const dateObj = new Date(dataRef.current.time * 1000);
            const hours = dateObj.getUTCHours();
            const minutes = dateObj.getUTCMinutes();
            const seconds = dateObj.getSeconds();
    
            let resultTime = hours !== 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : '';
            resultTime += minutes !== 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : '';
            resultTime += seconds !== 0 ? `${seconds} second${seconds > 1 ? 's' : ''} ` : '';
    
            console.log(resultTime);
            setTimeout(() => {
              window.alert(`Sudoku puzzle completed in ${resultTime} with ${dataRef.current.mistakes} mistake(s)`);
            }, 100);
          } else {
            setTimeout(() => {
              const message = dataRef.current.mistakes === 0 ? 'Excellect work! You finished the puzzle with no mistakes. You definitely got the hang of it.' : 'Nice job! You finished the puzzle. I believe you got the hang of it.';
              window.alert(message);
            }, 100);
          }
        }
    }, [dataset, solution, gameMode]);



    useEventListener('keydown', (e) => {
        if(!isKeyPress.current) {
            isKeyPress.current = true;
            inputDigit(e);
        }
    });
    
    useEventListener('keyup', (e) => {
        isKeyPress.current = false;
    });

    //-----------------Render-Components------------------//

    return(
        <div className="col-xl-6 col-lg-7 col-md-10 col-12">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" viewBox="0 0 1206 1606">
                <Board
                    y={105}
                    dataset={dataset}
                    solution={solution}
                    tileSelected={tileSelected}
                    isGameOver={isGameOver}
                    isPaused={isPaused}
                    selectTile={selectTile}
                />

                {
                    gameMode === 0 &&
                    <StatsDisplay 
                        isGameOver={isGameOver}
                        time={time}
                        mistakes={mistakes}
                    />
                }

                <InputPads
                    y={10}
                    keyRefs={keyRefs}
                    inputDigitByButton={inputDigitByButton}
                />

                <GameButtons
                    y={15}
                    newGame={newGame}
                    togglePause={togglePause}
                    gameMode={gameMode}
                    setMode={setMode}
                    isPaused={isPaused}
                />
            </svg>
        </div>
    );
}

export default Sudoku;