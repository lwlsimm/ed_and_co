import './address.css';
import axios from 'axios';
import { keys } from '../../assets/keys';
import { useSelector } from 'react-redux';

const NewAddress = () => {

  const tokens = useSelector(state => state.tokenReducer);
  
  const handleAddAddress = async(e) => {
    e.preventDefault();
    const {accessToken, refreshToken} = tokens
    await axios({
      method: 'post',
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      data: {
        address_1: e.target.address_1.value,
        address_2: e.target.address_2.value,
        postal_town: e.target.postal_town.value,
        post_code: e.target.post_code.value,
        country: e.target.country.value
      },
      url: keys.ADD_ADDRESS_PATH,
    });
    window.location.reload(true);
  };

    return (
    <div className="address">
      <form onSubmit={(e) => handleAddAddress(e)}>
        <input type="text" id="address_1" placeholder="First line"/>
        <input type="text" id="address_2" placeholder="Second line (optional)"/>
        <input type="text" id="postal_town" placeholder="Town/City"/>
        <input type="text" id="post_code" placeholder="Post Code"/>
        <input type="text" id="country" placeholder="Country"/>
        <button type="submit" className="add-update">Submit Change</button>
      </form>
    </div>
    )

};

export default NewAddress;