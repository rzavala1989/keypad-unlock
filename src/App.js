import './App.css';
import { KeypadUnlock } from './components/KeypadUnlock';

//CHALLENGE: WRITE AN FC CONTAINING TWO PROPS, the App itself, and a 4 digit combination.
// That combination will be set by us and a keypad component will be displayed as well as the user's input right on top
// If combination is entered correct, we can proceed to the rest of the page
// If incorrect, we will be prompted to try again

function App() {
  const screenUnlocked = () => (
    <p style={{ textAlign: 'center' }}>You are logged in</p>
  );

  return (
    <div className='App'>
      <header className='App-header'>Enter your PIN:</header>
      <KeypadUnlock
        correctCombo={[4, 3, 2, 1]} /* 4321... correctCombo.join('') */
        screenUnlocked={screenUnlocked}
      />
    </div>
  );
}

export default App;
