import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaClipboard } from "react-icons/fa";

const NUMBERS = "0123456789";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";

function App() {
  const [otpLength, setOtpLength] = useState(4);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [otp, setOtp] = useState("");  // Fixed: initialized the state with an empty string

  const handleChange = (e) => {
    setOtpLength(Number(e.target.value)); // Fixed: Convert the value to a number
  }

  const handleUpperCase = (e) => {
    setIncludeUppercase(!!e.target.checked);
  }

  const handleLowerCase = (e) => {
    setIncludeLowercase(!!e.target.checked);
  }

  const generateOtp = () => {
    let characters = NUMBERS;

    if (includeUppercase) {
      characters += UPPERCASE;
    }

    if (includeLowercase) {
      characters += LOWERCASE;
    }

    let password = "";
    for (let i = 0; i < otpLength; i=i+1) {
      const index = Math.floor(Math.random() * characters.length);
      password += characters[index];
    }

    setOtp(password);
    toast("OTP GENERATED SUCCESSFULLY", {
      position:'top-center'
    })
  }

  const copyToClipBoard =()=>{
    navigator.clipboard.writeText(otp);
    toast("press ctrl+v to use the otp",{
      position:'top-center'
    })
  }

  return (
    <div className='box'>
      <div className='card'>
        <h2>Random OTP Generator {otpLength}</h2>
        <div className='otp-container'>
          <h3>{otp}  <button className='clip' onClick={copyToClipBoard}>
            < FaClipboard/>
          </button></h3>
         
        </div>

        <div className="formgroup">
          <label htmlFor="select-box">OTP Length </label>
          <select id="select-box" className="select-box" value={otpLength} onChange={handleChange}>
            <option>4</option>
            <option>6</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="includeNumbers">Include Numbers</label>
          <input type="checkbox" id="includeNumbers" checked={false}></input>
        </div>

        <div className="form-group">
          <label htmlFor="includeUppercase">Include Uppercase</label>
          <input type="checkbox" id="includeUppercase" onChange={handleUpperCase} checked={includeUppercase}></input>
        </div>

        <div className="form-group">
          <label htmlFor="includeLowercase">Include Lowercase</label>
          <input type="checkbox" id="includeLowercase" onChange={handleLowerCase} checked={includeLowercase}></input>
        </div>

        <div className="button">
          <button className='generate' onClick={generateOtp}>Generate</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App;
