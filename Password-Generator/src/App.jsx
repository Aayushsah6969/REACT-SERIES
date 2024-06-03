import "./style.css";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

  const handleLength = (event) => {
    setLength(event.target.value);
  };

  const handleNumbers = (event) => {
    setIncludeNumbers(event.target.checked);
  };

  const handleSpecialChars = (event) => {
    setIncludeSpecialChars(event.target.checked);
  };

  const handleGeneratePassword = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,-.<>?';

    let characters = letters;
    if (includeNumbers){
        characters = characters + numbers;
    } 
    if (includeSpecialChars){
      characters = characters + specialChars;
    } 

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      let total_random = Math.random() * characters.length;
      const randomIndex = Math.floor(total_random);
      newPassword = newPassword + characters[randomIndex];
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <>
      <div className="password-generator">
        <h1>Password Generator</h1>
        <input type="text"  placeholder="Your password"  value={password} readOnly />
        <button className="button" onClick={handleGeneratePassword}>Generate</button>
        <button className="button" onClick={copyToClipboard}>Copy</button>
        <div className="controls">
          <input type="range" min='5' max='25' value={length} onChange={handleLength} />
          <span>Length: {length}</span>
          <label> <input type="checkbox" onClick={handleNumbers} />Number</label>
          <label> <input type="checkbox" onClick={handleSpecialChars} /> Special Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
