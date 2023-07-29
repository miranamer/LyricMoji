import { useEffect, useState } from 'react'
import Rules from './components/Rules';
import Levels from './components/Levels';
import {AiFillHeart} from 'react-icons/ai'

function App() {

  const [level, setLevel] = useState(0);
  const [lives, setLives] = useState(3);
  const [rules, setRules] = useState(true);

  const [hearts, setHearts] = useState([<AiFillHeart className='text-red-500 text-[40px]' key='1' / >, <AiFillHeart className='text-red-500 text-[40px]' key='2' / >, <AiFillHeart className='text-red-500 text-[40px]' key='3' / >]);
  const [dead, setDead] = useState([]);

  
  return (
    <>
      <div className="flex items-center gap-2 justify-center h-screen flex-col font-vic bg-[#E8DACC]">
        <h1 className='font-semibold text-4xl fixed top-10'>LyricM😀ji</h1>
        {rules ? <Rules setRules={setRules} /> : <Levels setDead={setDead} dead={dead} lives={lives} setLives={setLives} hearts={hearts} setHearts={setHearts} level={level} setLevel={setLevel} />}
        <div className="flex gap-3 fixed bottom-[30px]">
          {hearts.map((item) => {
            return (item)
          })}
          {dead.map((item) => {
            return (item)
          })}
        </div>
      </div>
    </>
  )
}

export default App
