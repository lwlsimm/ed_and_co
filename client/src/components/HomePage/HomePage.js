import ShopFront from '../ShopFront/ShopFront';
import ImageSlider from '../ImageSlider/ImageSlider';
import { useEffect, Fragment } from 'react'; 
import {keys} from '../../assets/keys'
import { loadStock } from '../../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { logout, deleteTokens } from '../../state/actions';


const HomePage = () => {

  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loginReducer);
  const tokens = useSelector(state => state.tokenReducer);
  const history = useHistory();
  const homePath = '/';

  const getServerData = async () => {
    try {
      const {accessToken, refreshToken} = tokens;
      const data = await axios({
        method: 'post',
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        url: keys.ACCOUNT_PATH,
      });
      if(data.data.basic_data) {
        return true;
      }
      return false
     // if(data.data.)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(async () => { 
    const stock = await axios(keys.STOCK_PATH);
    dispatch(loadStock(stock.data));
    if(loggedIn) {
      const res = await getServerData()
      console.log(await res)
      if(await ! res) {
        dispatch(logout());
        dispatch(deleteTokens());
        history.push(homePath);
      }
    }
  }, []);



  return (
    <Fragment>
      <ShopFront />
      <ImageSlider />
    </Fragment>
  )
};

export default HomePage;
