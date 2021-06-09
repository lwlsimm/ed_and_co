import Typewriter from '../Typwriter/Typewriter';
import './shopfront.css';
import { useSelector } from 'react-redux';
require('dotenv').config();

const ShopFront = () => {

  const stock = useSelector(state => state.stockReducer);

  return( 
    <div className="shopFront">
      {stock.map(item => <Typewriter key={item.id} product={item} mode={"ShopFront"}/>)}
    </div>
  )
}

export default ShopFront;