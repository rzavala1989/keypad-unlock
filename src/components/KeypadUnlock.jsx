import React, { useEffect, useState } from 'react';

const TIME_IN_MILLISECONDS = 30 * 1000;

export const KeypadUnlock = ({ correctCombo, UnlockedScreen }) => {
  const [submittedCombo, setSubmittedCombo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountLocked, setAccountLocked] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  //lockout timer
  const [time, setTime] = useState(TIME_IN_MILLISECONDS);
  const [referenceTime, setReferenceTime] = useState(Date.now());

  useEffect(() => {
    incorrectGuesses > 0 &&
      incorrectGuesses < 3 &&
      alert(
        `Incorrect PIN!\nYou have made ${incorrectGuesses} incorrect guesses`
      );

    if (incorrectGuesses === 3) {
      setAccountLocked(true);
    }
  }, [incorrectGuesses]);

  //for timer:
  useEffect(() => {
    if (accountLocked) {
      const countDownUntilZero = () => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            setAccountLocked(false);
            setIncorrectGuesses(0);
            setTime(TIME_IN_MILLISECONDS);
            return 0;
          }
          const now = Date.now();
          const interval = now - referenceTime;
          setReferenceTime(now);
          return prevTime - interval;
        });
      };
      //run timer every 1000ms
      setTimeout(countDownUntilZero, 1000);
    }
  }, [time, accountLocked]);

  useEffect(() => {
    if (accountLocked === true) {
      alert(`Account locked for ${time / 1000} seconds`);
    }
  }, [accountLocked]);

  const doesComboMatch = (ourCombo) => {
    console.assert(ourCombo.length === 4, 'Combo must be 4 digits');
    for (let digit of ourCombo) {
      if (ourCombo[digit] !== correctCombo[digit]) return false;
    }
    return true;
  };

  const handleNumberClick = async (number) => {
    const newCombo = [...submittedCombo, number];
    setSubmittedCombo(newCombo);
    if (newCombo.length === 4) {
      if (doesComboMatch(newCombo)) {
        setIsLoggedIn(true);
      } else {
        await setIncorrectGuesses(incorrectGuesses + 1);
        setSubmittedCombo([]);
      }
    }
  };

  const Row = ({ startValue }) => (
    <div style={{ display: 'flex' }}>
      {[startValue, startValue + 1, startValue + 2].map((num) => (
        <button
          style={{
            height: 150,
            width: 150,
            fontSize: 100,
            borderStyle: 'solid',
          }}
          onClick={() => handleNumberClick(num)}
          disabled={accountLocked}
        >
          {num}
        </button>
      ))}
    </div>
  );

  // Our keypad will look in our code
  // Row 1: 1 2 3 ... begin value = 1
  // Row 2: 4 5 6 ... begin value = 4
  // Row 3: 7 8 9 ... begin value = 7

  return isLoggedIn ? (
    <UnlockedScreen />
  ) : (
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
      <button
        style={{ height: 150, width: 150, fontSize: 100, borderStyle: 'solid' }}
        onClick={() => handleNumberClick(0)}
        disabled={accountLocked}
      >
        {' '}
        0
      </button>
    </div>
  );
};
