import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Address from './Address';
import NewAddress from './NewAddress';
import Order from './Order'
import './myaccount.css';
import './address.css';
import { keys } from '../../assets/keys';
import axios from 'axios';
import { emptyCart, logout, deleteTokens } from '../../state/actions';
import { useHistory } from 'react-router-dom';


const MyAccount = () => {

  const [addressData, setAddressData] = useState([])
  const [orderData, setOrderData] = useState([])
  const [basicData, setBasicData] = useState({})
  const [addAddress, setAddAddress] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [pwErrorMsg, setPwErrorMsg] = useState(null);
  const history = useHistory();
  const homePath = '/';

  const tokens = useSelector(state => state.tokenReducer);
  const dispatch = useDispatch()

  const getServerData = async (tokens) => {
    try {
      const { accessToken } = tokens;
      const data = await axios({
        method: 'post',
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        url: keys.ACCOUNT_PATH,
      });
      setAddressData(data.data.addresses);
      setBasicData(data.data.basic_data);
      setOrderData(data.data.order_data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(()=> {
    getServerData(tokens);
  }, []);

  const handleAdd = () => {
    setAddAddress(true);
  };

  const handlePwUpdate = () => {
    setNewPassword(! newPassword);
    setPwErrorMsg(null);
  };

  const handleSubmitNewPW = async (e) => {
    e.preventDefault();
    setPwErrorMsg(null);
    const { accessToken } = tokens;
    if(e.target.new_password.value === e.target.conf_password.value) {
      try {
      const data = await axios({
          method: 'put',
          headers: {
            authorization: `Bearer ${accessToken}`
          },
          data: {
            curr_password: e.target.curr_password.value,
            password: e.target.new_password.value
          },
          url: keys.PW_PATH,
      });
      setPwErrorMsg('Password Updated Sucessfully');
      setTimeout(()=>setNewPassword(false), 3000);
      } catch (error) {
        setPwErrorMsg("Password not updated!  Please ensure you've entered the correct password");
      }
    } else {
      setPwErrorMsg('Passwords do not match! Please try again')
    }
  }

  const handleCancelAdd = () => {
    setAddAddress(false);
  }

  const changePassword = () => {
    return (
      <div className="address">
      <form onSubmit={(e)=> handleSubmitNewPW(e)}>
        <input type="text" type="password" id="curr_password" placeholder="Current Password"/>
        <input type="text" type="password" id="new_password" placeholder="New Password"/>
        <input type="text" type="password" id="conf_password" placeholder="Confirm New Password"/>
        {pwErrorMsg ? <p>{pwErrorMsg}</p> : null}
        <button className="add-update">Submit Change</button>
      </form>
    </div>
    )
  };

  const handleLogOut = async () => {
    dispatch(logout());
    dispatch(emptyCart());
    dispatch(deleteTokens());
    history.push(homePath);
  };

  
  return ( 
    <div className="account-page">
      <h2 className="account-top-header">My Account</h2>
      <button onClick={()=> handleLogOut()} className="navBtn">Log Out</button>
      <div className="account-basics">
        <h3>Basic Details</h3>
        <p>Name: {`${basicData.first_name} ${basicData.last_name}`}</p>
        <p>Email: {basicData.email}</p>
        {newPassword ?
        changePassword() : null}
        <button onClick={()=>handlePwUpdate()} className="account-btn">{newPassword ? 'Cancel': 'Change Password'}</button>
      </div>

      <h2>Addresses:</h2>
      <div>
        <div className="address-container">
        {addressData.length >= 1 ? addressData.map(
          (address) => {return <Address key={address.id} address={address}/>}
        ) : null}
        {addAddress ? <NewAddress /> : null}
        </div>
        {addAddress ? 
        null
        : 
        <button className="account-btn" onClick={()=> handleAdd()}>Add an Address</button>}
      </div>
      <h2 className="order-header">Past Orders:</h2>
      <div>
        <div className="address-container">
        {orderData.length >= 1 ? orderData.map(
          (order) => {return <Order key={order.id} id={order.id} dateCreated={order.date_created} price={order.price} status={order.status}/>}
        ) : null}
        </div>
      </div>
      
    </div>
  )
};

export default MyAccount;