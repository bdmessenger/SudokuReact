import React from 'react';

const positions = new Array(8).fill(134).reduce(
  (arr, value, index) => {
    arr.push(value + value * index);
    return arr;
  },
  [0]
);

function Board({x = 0, y = 0, dataset, solution, tileSelected, isGameOver, isPaused, selectTile}) {
    const boardPosition = x + ',' + y;
    
    return(
        <g transform={`translate(${boardPosition})`}>
            <rect width={1206} height={1206} fill="#393e46" stroke="cyan" />
            <g>
                {
                    dataset && positions.map((yPosition, row) => {
                        return positions.map((xPosition, tile) => {
                            const data = dataset[row][tile];
                            const correctData = solution[row][tile];

                            return (
                                <text
                                    id={`row${row + 1}_tile${tile + 1}_text`}
                                    key={`row${row + 1}_tile${tile + 1}_text`}
                                    x={64 + xPosition}
                                    y={76 + yPosition}
                                    fontSize="110px"
                                    fill={data === correctData ? "white" : 'red'}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {dataset[row][tile]}
                                </text>
                            );
                        });
                    })
                }
            </g>

            <g className="tileRects">
                {
                    dataset && positions.map((yPosition, row) => {
                        return positions.map((xPosition, tile) => {
                            return (
                                <rect
                                    id={`row${row + 1}_tile${tile + 1}`}
                                    key={`row${row + 1}_tile${tile + 1}`}
                                    x={xPosition}
                                    y={yPosition}
                                    width={134}
                                    height={134}
                                    fill={
                                    `row${row + 1}_tile${tile + 1}` === tileSelected
                                        ? "rgba(0,173,181,0.5)"
                                        : "transparent"
                                    }
                                    stroke="black"
                                    style={{cursor: (!isGameOver && !isPaused && dataset && dataset[row][tile] === ' ') ? 'pointer' : 'auto'}}
                                    onClick={selectTile}
                                />
                            );
                        });
                    })
                }
            </g>

            <line
                x1={402}
                y1={0}
                x2={402}
                y2={1206}
                stroke="#00adb5"
                strokeWidth={8}
            />
            <line
                x1={804}
                y1={0}
                x2={804}
                y2={1206}
                stroke="#00adb5"
                strokeWidth={8}
            />

            <line
                x1={0}
                y1={402}
                x2={1206}
                y2={402}
                stroke="#00adb5"
                strokeWidth={8}
            />
            <line
                x1={0}
                y1={804}
                x2={1206}
                y2={804}
                stroke="#00adb5"
                strokeWidth={8}
            />
        </g>
    );
}

export default Board;