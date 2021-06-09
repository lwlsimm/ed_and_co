import { useState } from "react";
import './address.css';
import axios from 'axios';
import { keys } from '../../assets/keys';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Address = (props) => {

  const [updating, setUpdating] = useState(false);
  const tokens = useSelector(state => state.tokenReducer);
  const path = `/account`;
  const history = useHistory();

  const {id, address_1, address_2, postal_town, post_code, country} = props.address;

  const deleteAddress = async (id) => {
    const { accessToken } = tokens;
    const del = await axios({
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      data: {
        address_id: id
      },
      url: keys.DELETE_ADDRESS_PATH,
    });
    history.push(path);
  }

  const handleUpdateAddress = async(e) => {
    e.preventDefault();
    const { accessToken } = tokens;
    await axios({
      method: 'post',
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      data: {
        address_key: id,
        address_1: e.target.address_1.value,
        address_2: e.target.address_2.value,
        postal_town: e.target.postal_town.value,
        post_code: e.target.post_code.value,
        country: e.target.country.value
      },
      url: keys.UPDATE_ADDRESS_PATH,
    });
    history.push(path);
  }

  if(updating){
    return (
    <form onSubmit={(e) => handleUpdateAddress(e)}>
    <div key={id} className="address">
      <input type="text" id="address_1" defaultValue={address_1} placeholder="First line"/>
      <input type="text" id="address_2" defaultValue={address_2} placeholder="Second line (optional)"/>
      <input type="text" id="postal_town" defaultValue={postal_town} placeholder="Town/City"/>
      <input type="text" id="post_code" defaultValue={post_code} placeholder="Post Code"/>
      <input type="text" id="country" defaultValue={country} placeholder="Country"/>
      <button className="add-update">Submit Change</button>
      <button className="add-cancel" onClick={()=> setUpdating(false)}>Cancel</button>
    </div>
    </form>
    )
  };

  return (
    <div key={id} className="address">
    <form>
      <p>First line: {address_1}</p>
      <p>Second line: {address_2}</p>
      <p>Postal Town: {postal_town}</p>
      <p>Post Code: {post_code}</p>
      <p>Country: {country}</p>
      <button className="add-update" onClick={()=> setUpdating(true)}>Update</button>
    </form>
      <button onClick={() => deleteAddress(id)} className="add-delete">Delete</button>
    </div>
  )
};

export default Address;