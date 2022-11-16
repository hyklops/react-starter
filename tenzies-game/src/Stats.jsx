import { useEffect, useState } from "react";

export default function Stats({ rollCount, timer, bestTime }) {
  return (
    <div className="stats">
      <div className="stats-flex">
        <div className="roll-count stats--element">
          <strong>Roll:</strong> {rollCount}
        </div>
        <div className="stats--element">
          <strong>Best: </strong>
          {bestTime === 0 ? 0 : bestTime} second
        </div>
      </div>
      <div className="timer stats--element">
        <strong> Time: </strong> {timer === 0 ? 0 : timer} second
      </div>
    </div>
  );
}
