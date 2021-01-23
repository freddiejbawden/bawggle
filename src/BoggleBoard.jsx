import React, {useState, useEffect} from 'react'
import BoggleSquare from './BoggleSquare'
import Timer from './Timer'
import './boggleBoard.css'
import dice from './dice.json'
export default function BoggleBoard(props) {

  const [grid, setGrid] = useState([])
  const [needsReset, setNeedsReset] = useState(false)

  const resetGrid = () => {
    setNeedsReset(true)
  }


  useEffect(() => {
    setNeedsReset(false)
    return () => {}
  }, [needsReset])

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 

  const getLetterFromDice = (x) => {
    const diceset = (props.n === 4) ? "dice4" : "dice5"
    return dice[diceset][x][getRandomInt(0,5)]
  }
  const createRow = (n, arrOrder, start) => {
    let row = []
    for (let i = 0; i < n; i++) {
      row.push(getLetterFromDice(arrOrder[start+i]))
    }
    return row
  }


  const shuffle = (n) => {
    let arr = []
    for (let i = 0; i < n; i++) {
      arr.push([i, Math.random()])
    }
    return arr.sort((a,b) => (a[1] < b[1]) ? -1 : (a[1] > b[1]) ? 1 : 0).map(x => x[0])
  }

  const createGrid = (n) => {
    let grid = []
    let diceOrder = shuffle(n*n);
    for (let i = 0; i < n; i++) {
      grid.push((createRow(n, diceOrder, i*n)))
    }
    setGrid(grid)
  }


  const { shouldShuffle, setShuffle, n } = props;

  useEffect(() => {
    createGrid(props.n)
    setShuffle(false)
    console.log(grid)
  }, [shouldShuffle, n])

  const gridRender = grid.map((row) => {
    return <div className="boggle-row">{row.map(square => (<BoggleSquare value={square}></BoggleSquare>))}</div>
  })
  

  return (
      <div className="boggle-board">
        {gridRender}
      </div>    
  )
}
