import React from 'react'

const Win = ({levelsNum, level}) => {
  return (
    <>
        <h1>Congratulaions! You Won All {levelsNum} levels. </h1>
        <p>Score: {level+1} / {levelsNum}</p>
    </>
  )
}

export default Win