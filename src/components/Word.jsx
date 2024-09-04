import React from 'react';

function Word({ word, isCurrent }) {
  return (
    <div className={`word ${isCurrent ? 'current' : ''}`}>
      {word.split('').map((letter, index) => (
        <span key={index} className="letter">
          {letter}
        </span>
      ))}
    </div>
  );
}

export default Word;
