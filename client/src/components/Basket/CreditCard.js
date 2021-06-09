import './pay-form.css';
import './pay-form.css';
import { useEffect, useState } from 'react';
import { keys } from '../../assets/keys';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './pay-form.css'
import { emptyCart, updateAmountToPay } from '../../state/actions'

const CreditCard = () => {

  const tokens = useSelector(state => state.tokenReducer);
  const [selectedAddress, setSelectedAddress] = useState(NaN);
  const [fullName, setFullName] = useState('');
  const [addressesFromDB, setAddressesFromDB] = useState([]);
  const [orderSuccess, setOrderSucess] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartItems = useSelector(state => state.cartReducer);
  const amountToPay = useSelector(state => state.amountToPayReducer);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const data = await getData();
      const {addresses} = await data;
      setAddressesFromDB(addresses);
    } catch (error) {
      
    }
  }, [] );

  const getData = async () => {
    try {
      const {accessToken, refreshToken} = tokens;
      const data = await axios({
        method: 'post',
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        url: keys.ACCOUNT_PATH,
      });
      const serverData = await data.data;
      return serverData;
    } catch (err) {
      console.error(err.message);
    }
  };

  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);


  const orderSubmit = async e => {
    e.preventDefault();
    setOrderPlaced(false);
    setOrderSucess(false)
    try {
      const {accessToken, refreshToken} = tokens;
      const data = await axios({
        method: 'post',
        data: {
          cart: cartItems,
          address_id: selectedAddress,
          name: fullName,
          price: amountToPay
        },
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        url: keys.ORDER_PATH,
      });
      const serverData = await data.data;
      if(serverData === 'Success') {
        setOrderSucess(true);
        setOrderPlaced(true);
        dispatch(emptyCart());
        dispatch(updateAmountToPay(0));
      }
    } catch (err) {
      console.error(err.message);
      setOrderPlaced(true);
      setOrderSucess(false);
    };
    
  }

  

  const addressOptions = [];
  addressesFromDB.map(item => {
    const addObj = {};
    addObj['key'] = item.id;
    addObj['id'] = item.id;
    addObj['text'] = item.address_1;
    addObj['value'] = `${item.address_1} ${item.pass_code}`;
    addressOptions.push(addObj);
    return addObj;
  });  

  const submitButton = ! isNaN(selectedAddress) && fullName.length > 2 ? 
   <button className="cc-btn cc-submit">Submit Order</button> :
  <button className="cc-btn cc-submit btn-disabled" disabled>Submit Order</button> ;
 

  return (
    <form className="cc-form" onSubmit={(e)=> orderSubmit(e)}>
      <div className="cc-your-details">
          <div className="cc-details-left">
          <h4 className="cc-heading">Delivery Address:</h4>
            <div className="your-details-container" >
            <div className="card-row">
              <input className="cc-input" type="text" id="name" placeholder="Full name" onChange={(e)=> setFullName(e.target.value)}></input>
              <label className="cc-label">Full Name of Addressee</label>
            </div>
            <select className="cc-select" onChange={e => setSelectedAddress(e.target.value)}>
              <option value={NaN}>--SELECT ADDRESS--</option>
              {addressOptions.map(item => <option value={item.id} key={item.key}>{item.text}</option>)}
            </select>


            </div>
          </div>
          <div className="cc-details-right">
            <h4 className="cc-heading">Credit Card Details:</h4>
            <p>Please note: this is a demo app.   No credit card details will be submitted.</p>
            <div className="card-row">
              <input className="cc-input" type="text" defaultValue="J. Bloggs" id="name" placeholder="Name on the card"></input>
              <label className="cc-label" for="name" >Name on the card</label>
            </div>
            <div className="card-row">
              <input className="cc-input" id="ccn" type="tel" inputmode="numeric" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" defaultValue="1234123412341234"></input>
              <label className="cc-label" for="ccn">Credit Card Number</label>
            </div>
            <div className="card-col">
                <div className="card-row exp-cvv">
                  <input className="cc-input" id="cvv" type="tel" inputmode="numeric" maxlength="4" placeholder="xxx" defaultValue="123"></input>
                  <label className="cc-label" for="ccv">Expiration Date</label>
                </div>
                <div className="card-row exp-cvv">
                  <input className="cc-input" id="cvv" type="tel" inputmode="numeric" maxlength="4" placeholder="xx / xx" defaultValue="12/25" ></input>
                  <label className="cc-label" for="cvv">CVV</label>
                </div>
            </div>
        </div>
      </div>
        {orderPlaced && ! orderSuccess ?
        <div className="cc-btn-container"><h2 className="red">Order Unsuccessful - Please contact Customer Services</h2>
        </div>: null}
        {orderPlaced && orderSuccess ?
        <div className="cc-btn-container"><h2 className="green">Order Completed - Thank you for your custom</h2>
        </div>: null}
        {amountToPay > 0 ?
        <div className="cc-btn-container">
        {submitButton}
        </div>
        : null}
      
      
      
      
    </form>
  )
};

export default CreditCard;