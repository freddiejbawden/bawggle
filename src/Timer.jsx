import React, {useState, useEffect} from 'react'
import BoggleBoard from './BoggleBoard';
import './timer.css'

const TimerState = {
  OFF: 0,
  ON: 1
}

export default function Timer(props) {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(180);
  const [gridSize, setGridSize] = useState(4)
  const [shouldShuffle, setShuffle] = useState(false)
  const [timerState, setTimerState] = useState(TimerState.OFF)
  const formatTime = (time) => {
    const mins = Math.floor(time/60)
    const seconds = time-mins*60
    const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds
    return `${mins}:${formattedSeconds}`
  }

  const onDone = () => {
    console.log('done')
  }

  useEffect(() => {
    if (!timeLeft || timerState === TimerState.OFF) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft === 1) {
        onDone()
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft,timerState]);

  const timerToggle = () => {
    if (timerState === TimerState.OFF) {
      setTimerState(TimerState.ON)
    } else {
      setTimerState(TimerState.OFF)
    }
  }

  const makeTimerButton = () => {
    const timerClass = (timerState === TimerState.OFF) ? "button-primary" : "";
    const timerText = (timerState === TimerState.OFF) ? "Start" : "Pause"
    return <button onClick={timerToggle} className={timerClass}>{timerText}</button>
  }

  const reset = () => {
    setTimerState(TimerState.OFF)
    setTimeLeft(180)
  }

  const changeNumber = () => {
    if (gridSize === 4) {
      setGridSize(5)
    } else {
      setGridSize(4)
    }
  }

  const gridText = (gridSize === 4) ? 5 : 4

  return (
    <div className="board-container">
      <div>
        <div className="timer-container">
        <span>{formatTime(timeLeft)}</span>
        </div>
        <div className="button-container">
          {makeTimerButton()}
          <button onClick={reset}>{"Reset Timer"}</button>
          <button onClick={changeNumber}>{`Switch to ${gridText}x${gridText}`}</button>
          <button onClick={() => setShuffle(true)}>Shuffle</button>
        </div>
    </div>
    <div>
      <BoggleBoard shouldShuffle={shouldShuffle} setShuffle={setShuffle} n={gridSize} />
    </div>
    <div>
      <table className="points-container">
        <tr>
        <td><strong>3 Letters: </strong>1 point</td>
        <td><strong>4 Letters: </strong>1 point</td>
        <td><strong>5 Letters: </strong>2 points</td>
        </tr>
        <tr>
        <td><strong>6 Letters: </strong>3 points</td>
        <td><strong>7 Letters: </strong>5 points</td>
        <td><strong>8+ Letters: </strong>11 points</td>
        </tr>
        
       
      </table>
    </div>
  </div>
    
  )
}
