import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineHeart } from "react-icons/ai";
import { Configuration, OpenAIApi } from "openai";
import Win from "./Win";
import Lose from "./Lose";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import toast, { Toaster } from "react-hot-toast";

// ! Add a leaderboard page if you can get the model to be ran locally instead of via an API Key

const Levels = ({
  dead,
  setDead,
  level,
  setLevel,
  hearts,
  setHearts,
  lives,
  setLives,
}) => {
  const [input, setInput] = useState("");
  const [artist, setArtist] = useState(false);
  const [song, setSong] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [generatedAns, setGeneratedAns] = useState("");
  const [score, setScore] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  //const [loading, setLoading] = useState(false);

  const questions = [
    // TODO: Get questions from firebase with diff docs for diff levels OR get popular songs from an api then get the lyrics from another api
    {
      q: "“You’ve been ___ by a smooth criminal”",
      a: "hit",
      title: "Easy",
      artist: "Michael Jackson",
      song: "Smooth Criminal",
    },
    {
      q: '"Take a look at these ________ wrong it’s a life of squinting..."',
      a: "diamond",
      title: "Medium",
      artist: "Central Cee & Dave",
      song: "Sprinter",
    },
    {
      q: '"My shooter in the six is sorta like a ______"',
      a: "raptor",
      title: "Hard",
      artist: "Central Cee",
      song: "Central Cee - Daily Duppy",
    },
    {
      q: '"_______ _____ ____ __ ____, to the place, I belong"',
      a: "country roads take me home",
      title: "Expert",
      artist: "John Denver",
      song: "Take Me Home, Country Roads",
    },
    {
      q: '"_ ___ _ ___ ____ and I want it painted black."',
      a: "I see a red door",
      title: "Pro",
      artist: "Rolling Stones",
      song: "Paint It, Black",
    },
    {
      q: '"been spending most their lives ______ __ ___ _________ ________."',
      a: "living in the gangsters paradise",
      title: "Veteran",
      artist: "Coolio",
      song: "Gangsters Paradise",
    },
    {
      q: '"They like me _ ____ ____ __ ____ __ like they love pac"',
      a: "I want them to love me",
      title: "Master",
      artist: "50 Cent",
      song: "In Da Club",
    },
    {
      q: '"Money swollen like ____, huh"',
      a: "cyst",
      title: "Yeat Mode",
      artist: "Yeat",
      song: "Flawless",
    },
  ];

  const maxLevel = questions.length;

  const configuration = new Configuration({
    apiKey: process.env.apiKey,
  });

  delete configuration.baseOptions.headers["User-Agent"];

  const openai = new OpenAIApi(configuration);

  const correctToast = () => toast.success("Correct!");
  const incorrectToast = () => toast.error("Incorrect");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    console.log("Level: ", level, "Max: ", maxLevel);

    var correct = false;

    const prompt = `can the following emoji sentence: "${input}" be loosely and creatively interpreted as the phrase: '${questions[level].a}' - Only answer with 1 for yes and 0 for no. No other output. It does NOT NEED TO SPECIFICALLY CONVEY THE PHRASE, JUST LOOSELY.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      //temperature: 0.8,
      max_tokens: 2069,
    });
    console.log(completion.data.choices[0].message.content);
    correct = completion.data.choices[0].message.content;
    console.log(prompt);

    if (correct === "1") {
      if (level + 1 === maxLevel) {
        console.log("WIN!"); // ? Win Goes Here
        setWon(true);
        return;
      }

      setLevel(level + 1);
      setInput("");
      setArtist(false);
      setSong(false);
      setGeneratedAns("");
      setScore(score + 1);
      correctToast();
    } else {
      if (hearts.length === 0) {
        return;
      }

      incorrectToast();

      if (hearts.length - 1 === 0) {
        console.log("DEAD!"); // ! Lost goes here
        setLost(true);
      }
      setHearts(hearts.splice(0, hearts.length - 1));
      setDead([
        ...dead,
        <AiOutlineHeart className="text-red-500 text-[40px]" />,
      ]);
    }
  };

  const handleInput = (e) => {
    const invalid = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    if (!invalid.includes(e.target.value)) {
      setInput(e.target.value);
    }
  };

  const generateAnswer = async () => {
    onOpen();

    console.log("started gen 1");

    if (generatedAns === "") {
      console.log("started gen");
      let prompt = `what emoji sentence best represents '${questions[level].a}'. Ouput just the emoji sentence and the given explanation, nothing else.`;

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        //temperature: 0.8,
        max_tokens: 2069,
      });
      console.log(completion.data.choices[0].message.content);
      setGeneratedAns(completion.data.choices[0].message.content);
    } else {
      console.log("already gen: ", generatedAns);
    }
  };

  //! Put loading spinner in submit text on button

  return (
    <>
      <div className="flex flex-col items-center justify-center relative bottom-[60px]">
        {!won && !lost ? (
          <>
            <h2 className="font-semibold text-xl mb-10">
              Level: {level + 1} ({questions[level].title})
            </h2>
            <p className="text-2xl">{questions[level].q}</p>
            <form
              className="flex gap-5 relative top-10 items-center justify-center"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                placeholder="Click Emojis Below"
                className="border-2 border-black rounded-md w-[350px] h-[40px] p-5"
                type="text"
                value={input}
                onChange={(e) => handleInput(e)}
              />
              <button className="w-[85px] h-[43px] bg-green-400 rounded-md border-2 border-black">
                Submit
              </button>
            </form>
            <div className="relative top-20">
              <EmojiPicker
                previewConfig={{ showPreview: false }}
                height={400}
                width={400}
                onEmojiClick={(e) => setInput((input) => input + e.emoji)}
              />
            </div>
            <div className="flex gap-10 items-center justify-center relative top-[130px]">
              <p
                onClick={() => setArtist(!artist)}
                className="hover:underline hover:font-semibold hover:cursor-pointer"
              >
                {artist === false ? "Reveal Artist" : questions[level].artist}
              </p>
              <p
                onClick={() => setSong(!song)}
                className="hover:underline hover:font-semibold hover:cursor-pointer"
              >
                {song === false ? "Reveal Song" : questions[level].song}
              </p>
            </div>
            <p
              onClick={generateAnswer}
              className="hover:underline hover:font-semibold hover:cursor-pointer text-green-500 fixed bottom-[30px] left-10"
            >
              Reveal An Answer
            </p>
          </>
        ) : won ? (
          <Win level={score} levelsNum={maxLevel} />
        ) : lost ? (
          <Lose level={score} levelsNum={maxLevel} />
        ) : null}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI Generated Answer w/ Explanation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {generatedAns !== "" ? generatedAns : <Spinner />}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </>
  );
};

export default Levels;
