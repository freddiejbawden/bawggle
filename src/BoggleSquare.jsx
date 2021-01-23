import React from 'react'
import './boggleSquare.css'
export default function BoggleSquare(props) {
  return (
    <div className="boggle-square">
      <span>{props.value}</span>
    </div>
  )
}
