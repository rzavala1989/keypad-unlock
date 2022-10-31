import React, { useState } from 'react';

export const KeypadUnlock = ({ correctCombo, screenUnlocked }) => {
  const [submittedCombo, setSubmittedCombo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountLocked, setAccountLocked] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const doesComboMatch = (ourCombo) => {
    console.assert(ourCombo.length === 4, 'Combo must be 4 digits');
    for (let digit of ourCombo) {
      if (ourCombo[digit] !== correctCombo[digit]) return false;
    }
    return true;
  };

  const handleNumberClick = (number) => {
    const newCombo = [...submittedCombo, number];
    setSubmittedCombo(newCombo);
    if (newCombo.length === 4) {
      if (doesComboMatch(newCombo)) {
        setIsLoggedIn(true);
      } else {
        setIncorrectGuesses(incorrectGuesses + 1);
        setSubmittedCombo([]);
      }
    }
  };

  const Row = ({ startValue }) => (
    <div style={{ display: 'flex' }}>
      {[startValue, startValue + 1, startValue + 2].map((num) => (
        <section
          style={{ height: 150, width: 150, borderStyle: 'solid' }}
          onClick={() => handleNumberClick(num)}
        >
          {num}
        </section>
      ))}
    </div>
  );

  // Our keypad will look in our code
  // Row 1: 1 2 3 ... begin value = 1
  // Row 2: 4 5 6 ... begin value = 4
  // Row 3: 7 8 9 ... begin value = 7

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 100,
        fontSize: 100,
      }}
    >
      <section style={{ height: 150, width: 450, borderStyle: 'solid' }}>
        {submittedCombo}
      </section>
      <Row startValue={1} />
      <Row startValue={4} />
      <Row startValue={7} />
      <div
        style={{ height: 150, width: 150, borderStyle: 'solid' }}
        onClick={() => handleNumberClick(0)}
      >
        {' '}
        0
      </div>
    </div>
  );
};
