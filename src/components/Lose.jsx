import React from 'react'

const Lose = ({level, levelsNum}) => {
  return (
    <>
        <h1>You Lost! Better Luck Next Time</h1>
        <p>Score: {level+1} / {levelsNum}</p>
    </>
  )
}

export default Lose