import { useState } from "react";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { keys } from '../../assets/keys';
import { login, addTokens } from '../../state/actions';
import { useHistory } from 'react-router-dom';

const Register = () => {

  const [emailValidation, setEmailValidation] = useState(true);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [regError, setRegError] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailValidation(true);
    setPasswordValidation(true);
    setEmailAlreadyExists(false);
    setRegError(false);
    if(e.target.email.value !== e.target.conf_email.value) {
      setEmailValidation(false);
    };
    if(e.target.password.value !== e.target.conf_password.value && e.target.password.value.lenght > 8) {
      setPasswordValidation(false);
    };  
  try {
    if(emailValidation && passwordValidation) {
      const data = await axios({
        method: 'post',
        data: {
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          email: e.target.email.value,
          password: e.target.password.value,
          address_1: e.target.address_1.value, 
          address_2: e.target.address_2.value,
          postal_town: e.target.postal_town.value,
          post_code: e.target.post_code.value,
          country: e.target.country.value
        },
        url: keys.REGISTER_PATH,
      });
      dispatch(login());
      dispatch(addTokens(data.data));
      history.push('/account');
    } else {
      setRegError(true);
    }
  } catch (err) {
      setRegError(true);
  }}


  return (
    <div className="login-container">
          <form onSubmit={e => handleSubmit(e)}>
          <h3>New Customer - Register</h3>
          {emailAlreadyExists ? 
            <p className="red">It looks like this email address already exists!</p>:
            null} 
          {regError ? 
            <p className="red">There was a problem with your registration.  Please contact customer support.</p>:
            null} 
          {emailValidation ? 
            null :
            <p className="red">Emails do not match... Please try again!</p>}
          {passwordValidation ? 
            null :
            <p className="red">Passwords must be more than 8 digits and must match ... Please try again!</p>}
          <div className="login-row">
            <div className="login-col">
                <input className="login-input" type="email" pattern="[^ @]*@[^ @]*" id="email" placeholder="Email"></input>
                <label className="login-label" for="email">Email </label>
              </div>
            <div className="login-col">
                <input className="login-input" type="email" pattern="[^ @]*@[^ @]*" id="conf_email" placeholder="Confirm Email"></input>
                <label className="login-label" for="conf-email">Confirm Email</label>
              </div>
           
            </div>
            <div className="login-row">
              <div className="login-col">
                <input className="login-input" type="password" id="password" placeholder="Password"></input>
                <label className="login-label" for="password">Password</label>
              </div> 
              <div className="login-col">
                <input className="login-input" type="password" id="conf_password" placeholder="Confirm Password"></input>
                <label className="login-label" for="password"> Confirm Password</label>
              </div>
            </div>
            <h4>Name & Address Details:</h4>
            <div className="login-col">

              <div className="login-row add-row start-row">
                  <label className="add-label" for="first_name">First Name</label>
                  <input className="login-input add-input" type="text" name="first_name" id="first_name" required></input>
              </div>
              <div className="login-row add-row add-row">
                  <label className="add-label" for="last_name">Last Name</label>
                  <input className="login-input add-input" type="text" name="last_name" id="last_name" required></input>
              </div>
              <div className="login-row add-row add-row">
                  <label className="add-label" for="address_1">First line</label>
                  <input className="login-input add-input" type="text" name="address_1" id="address_1" required></input>
              </div>

              <div className="login-row add-row">
                  <label className="add-label" for="address_2">Second line (optional)</label>
                  <input className="login-input add-input" type="text" name="address_2" id="address_2"></input>
              </div>

              <div className="login-row add-row">
                  <label className="add-label" for="postal_town">Postal Town</label>
                  <input className="login-input add-input" type="text" name="postal_town" id="postal_town" required></input>
              </div>

              <div className="login-row add-row">
                  <label className="add-label" for="post_code">Post Code</label>
                  <input className="login-input add-input" type="text" name="post_code" id="post_code" required></input>
              </div>
              <div className="login-row add-row">
                  <label className="add-label" for="country">Country</label>
                  <input className="login-input add-input" type="text" name="country" id="country" required></input>
              </div>

            </div>

            <input type="submit" className="login-btn login-submit"></input>
          </form>    
        </div>
  )
};

export default Register;