import React, { useState, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react';
import {AiOutlineHeart} from 'react-icons/ai'

const Levels = ({dead, setDead, level, setLevel, hearts, setHearts, lives, setLives}) => {

    const [input, setInput] = useState('');
    const maxLevel = 3;

    const questions = [ // TODO: Get questions from firebase with diff docs for diff levels OR get popular songs from an api then get the lyrics from another api
        {
            q: '“If you thinkin’ I’mma quit before I die, _____ __”',
            a: '😴',
            title: 'Easy'
        },
        {
            q: '"My shooter in the six is sorta like a ______"',
            a: "🦖",
            title: 'Medium'
        },
        {
            q: '"Take a look at these ________ wrong it’s a life of squinting..."',
            a: "💠",
            title: "Hard"
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);

        if(level+1 === maxLevel){
            console.log('WIN!'); // ? Win Goes Here
            return;
        }

        if(input === questions[level].a){
            setLevel(level + 1);
            setInput('');
        }
        else{
            if(hearts.length === 0){
                return;
            }

            if(hearts.length - 1 === 0){
                console.log('DEAD!') // ! Lost goes here
            }
            setHearts(hearts.splice(0, hearts.length-1))
            setDead([...dead, <AiOutlineHeart className='text-red-500 text-[40px]' />])
        }
    }

    const handleInput = (e) => {
        const invalid = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        if (!invalid.includes(e.target.value)){
            setInput(e.target.value);
        }
    }

    //! Put loading spinner in submit text on button 


  return (
    <>

        <h2 className='font-semibold text-xl mb-10'>Level: {level + 1} ({questions[level].title})</h2>
        <p className='text-2xl'>{questions[level].q}</p>
        <form className='flex gap-5 relative top-10 items-center justify-center'  onSubmit={(e) => handleSubmit(e)}>
            <input placeholder='Click Emojis Below' className='border-2 border-black rounded-md w-[350px] h-[40px] p-5' type="text" value={input} onChange={(e) => handleInput(e)} />
            <button className='w-[85px] h-[43px] bg-green-400 rounded-md border-2 border-black'>Submit</button>
        </form>
        <div className="relative top-20">
            <EmojiPicker previewConfig={{ showPreview: false }}
            height={400} width={400} onEmojiClick={(e) => setInput((input) => input + e.emoji)} />
        </div>

    </>
  )
}

export default Levels