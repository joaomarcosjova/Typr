import React, { useState, useEffect, useRef } from 'react';

function Game() {
  const [words, setWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timer, setTimer] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const gameRef = useRef(null);

  const wordList = 'in one good real one not school set they state high life consider on and...'.split(' ');

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            gameOverHandler();
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const newGame = () => {
    const newWords = [];
    for (let i = 0; i < 200; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      newWords.push(wordList[randomIndex]);
    }
    setWords(newWords);
    setGameOver(false);
    setTimeLeft(30);
    setTimer(null);
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
  };

  const gameOverHandler = () => {
    setGameOver(true);
    clearInterval(timer);
    setTimer(null);
  };

  const handleKeyUp = (e) => {
    if (gameOver) return;

    if (!timer) {
      setTimer(true);
    }

    const key = e.key;
    const currentWord = words[currentWordIndex];
    const expected = currentWord[currentLetterIndex];

    if (key === expected) {
      if (currentLetterIndex === currentWord.length - 1) {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setCurrentLetterIndex(0);
      } else {
        setCurrentLetterIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  return (
    <div id="game" tabIndex="0" ref={gameRef} onKeyUp={handleKeyUp}>
      <div id="words">
        {words.map((word, wordIndex) => (
          <div
            key={wordIndex}
            className={`word ${wordIndex === currentWordIndex ? 'current' : ''}`}
          >
            {word.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className={`letter ${
                  wordIndex === currentWordIndex && letterIndex === currentLetterIndex ? 'current' : ''
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      {gameOver && <div id="info">Game Over! WPM: {getWpm()}</div>}
      <div id="focus-error">Click here to focus</div>
    </div>
  );
}

export default Game;
