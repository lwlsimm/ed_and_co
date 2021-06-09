import { useState } from 'react';
import './login.css';
import Register from './Register';
import ExistingCustomer from './ExistingCustomer';

const LogIn = () => {

  const [register, setRegister] = useState(false);

  const toggleRegister = () => {
    const newRegStatus = !register;
    setRegister(newRegStatus);
  } 

  const buttonText = register ? 'Existing Customer Login' : 'New Customer Registration';

  return (
    <div className="login-page">
      {register ? 
        <Register />:
        <ExistingCustomer />
      }
        <button onClick={()=>toggleRegister()} className='login-btn'>
          {buttonText}
        </button>
    </div>
  )
};

export default LogIn;