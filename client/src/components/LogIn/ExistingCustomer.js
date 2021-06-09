import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { keys } from '../../assets/keys';
import { login, addTokens } from '../../state/actions';
import { useHistory } from 'react-router-dom';

const ExistingCustomer = () => {

  const [denied, setDenied] = useState(false)

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async (e) => {
    setDenied(false)
    e.preventDefault()
    try {
        const email = e.target.email.value;
        const password = e.target.password.value;
        const data = await axios({
          method: 'post',
          url: keys.LOGIN_PATH,
          data: {
            email: email,
            password: password
          }})
        dispatch(login());
        dispatch(addTokens(data.data));
        history.push('/')
    } catch (err) {
      setDenied(true)
    }
  };

  return (
      <div className="login-container">
          <form onSubmit={e => handleLogin(e)}>
          <h3>Existing Customer - Log In</h3>
          
          <div className="login-row"> 
            <div className="login-col">
                <input className="login-input" type="text" id="email" placeholder="Email Address" required></input>
                <label className="login-label" for="email">Email Address</label>
              </div>
            <div className="login-col">
                <input className="login-input" type="password" id="password" placeholder="Password" required></input>
                <label className="login-label" for="password">Password</label>
              </div> 
            </div>
            <button type="submit" className="login-btn login-submit">Log In</button>
            </form>
            {denied ?
            <p className="denied"> Login unsuccessful.  Please check your details and try again</p>: null}
        </div>
  )
};

export default ExistingCustomer;