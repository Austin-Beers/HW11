import React from 'react';
import './Spot.css';

 const Spot = (props) => {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      row,
    } = props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
      />
    );
  }
  export default Spot;