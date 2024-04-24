import React, { useState } from 'react';
import './App.css';
import { FaRegHandPointLeft, FaRegHandPointRight, FaRegHandPointUp, FaRegHandPointDown } from "react-icons/fa";

const TABLE_SIZE = 5;

const App = () => {
  const [position, setPosition] = useState({ x: null, y: null, facing: null });
  const [output, setOutput] = useState('');

  const handlePlace = () => {
    const randomX = 0;
    const randomY = 0;
    const directions = ['NORTH', 'SOUTH', 'EAST', 'WEST'];
    const randomFacing = directions[Math.floor(Math.random() * directions.length)];
    
    if (isValidPosition(randomX, randomY)) {
      setPosition({ x: randomX, y: randomY, facing: randomFacing });
    }
  };

  const handleMove = () => {
    const { x, y, facing } = position;
    if (facing === 'NORTH' && isValidPosition(x, y + 1)) {
      setPosition({ x, y: y + 1, facing });
    } else if (facing === 'SOUTH' && isValidPosition(x, y - 1)) {
      setPosition({ x, y: y - 1, facing });
    } else if (facing === 'EAST' && isValidPosition(x + 1, y)) {
      setPosition({ x: x + 1, y, facing });
    } else if (facing === 'WEST' && isValidPosition(x - 1, y)) {
      setPosition({ x: x - 1, y, facing });
    }
  };

  const handleLeft = () => {
    const { facing } = position;
    switch (facing) {
      case 'NORTH':
        setPosition({ ...position, facing: 'WEST' });
        break;
      case 'SOUTH':
        setPosition({ ...position, facing: 'EAST' });
        break;
      case 'EAST':
        setPosition({ ...position, facing: 'NORTH' });
        break;
      case 'WEST':
        setPosition({ ...position, facing: 'SOUTH' });
        break;
      default:
        break;
    }
  };

  const handleRight = () => {
    const { facing } = position;
    switch (facing) {
      case 'NORTH':
        setPosition({ ...position, facing: 'EAST' });
        break;
      case 'SOUTH':
        setPosition({ ...position, facing: 'WEST' });
        break;
      case 'EAST':
        setPosition({ ...position, facing: 'SOUTH' });
        break;
      case 'WEST':
        setPosition({ ...position, facing: 'NORTH' });
        break;
      default:
        break;
    }
  };

  const handleReport = () => {
    setOutput(`${position.x},${position.y},${position.facing}`);
  };

  const isValidPosition = (x, y) => {
    return x >= 0 && x < TABLE_SIZE && y >= 0 && y < TABLE_SIZE;
  };

  const robotFacing = (direction) =>{
    switch (direction) {
      case 'NORTH':
        return <FaRegHandPointUp />
      case 'SOUTH':
        return <FaRegHandPointDown />;
      case 'EAST':
        return <FaRegHandPointRight />
      case 'WEST':
        return <FaRegHandPointLeft />
      default:
        break;
    }
    if(direction === "NORTH"){
      return <FaRegHandPointRight />
    }else{
      return <FaRegHandPointLeft />
    }
  }

  return (
    <div className="App">
      <h1>Toy Robot Simulator</h1>
      <div className="table-container">
        <table className="table">
          <tbody>
            {[4, 3, 2, 1, 0].map(y => (
              <tr key={y}>
                {[0, 1, 2, 3, 4].map(x => (
                  <td key={`${x},${y}`} className={`cell ${position.x === x && position.y === y ? 'robot' : ''}`}>
                    {position.x === x && position.y === y && robotFacing(position.facing)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="controls">
        <button onClick={handlePlace}>PLACE RANDOM</button>
        <button onClick={handleMove}>MOVE</button>
        <button onClick={handleLeft}>LEFT</button>
        <button onClick={handleRight}>RIGHT</button>
        <button onClick={handleReport}>REPORT</button>
      </div>
      <div className="output">{output}</div>
    </div>
  );
};

export default App;
