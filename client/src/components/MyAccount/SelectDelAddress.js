import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Address from './Address';
import NewAddress from './NewAddress';
import './myaccount.css';
import './address.css';
import { keys } from '../../assets/keys';
import axios from 'axios';

const SelectDelAddress = () => {

  const [addressData, setAddressData] = useState([])
  const [addAddress, setAddAddress] = useState(false);


  const tokens = useSelector(state => state.tokenReducer);

  const getServerData = async () => {
    try {
      const {accessToken} = tokens;
      const data = await axios({
        method: 'post',
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        url: keys.ACCOUNT_PATH,
      });
      setAddressData(data.data.addresses)
    } catch (err) {
      console.error(err.message)
    }
  };

  useEffect(()=> {
    getServerData()
  }, []);

  const handleAdd = () => {
    setAddAddress(true);
  };

  return ( 
    <div className="account-page">
      <h2 className="account-top-header">Select Address</h2>

      <div>
        <div className="address-container">
        {addressData.length > 1 ? addressData.map(
          (address) => {return <Address key={address.id} address={address}/>}
        ) : null}</div>
        {addAddress ? <NewAddress /> : null}
        {addAddress ? 
        null
        : 
        <button className="account-btn" onClick={()=> handleAdd()}>Add an Address</button>}
      </div>
    </div>
  )
};

export default SelectDelAddress;