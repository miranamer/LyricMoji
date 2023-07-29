import React from 'react'

const Rules = ({setRules}) => {
  return (
    <>
        <h2 className='text-3xl underline mb-5'>How To Play</h2>
        <div className="text-center mt-10">
          <h2 className='text-2xl'>Finish The Lyric Using Emojis Only.</h2>
          <h2 className='text-2xl'>Difficulty Increases As Levels Go Up.</h2>
          <h2 className='text-2xl'>Try Beat All 10 Levels.</h2>
          <h2 className='text-2xl italic'>There Can Be Multiple Correct Answers.</h2>
          <h2 className='text-2xl font-semibold'>Good Luck!</h2>
        </div>
        <p onClick={() => setRules(false)} className='text-3xl mt-10 hover:cursor-pointer'>GO!</p>
    </>
  )
}

export default Rules