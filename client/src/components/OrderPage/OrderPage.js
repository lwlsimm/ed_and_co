import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { keys } from '../../assets/keys';
import OrderItem from './OrderItem';
import './orderPage.css';


const OrderPage = ({match}) => {

  const [orderDetails, setOrderDetails] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const tokens = useSelector(state => state.tokenReducer);
  const stock = useSelector(state => state.stockReducer);
  const history = useHistory();
  const acctPath = `/account`;

  const getServerData = async () => {
    try {
      const {accessToken} = tokens
      const data = await axios({
        method: 'post',
        data: {
          order_id: match.params.id
        },
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        url: keys.INDIVIDUAL_ORDER_PATH,
      });
      setOrderDetails(await data.data.order);
      setOrderItems(await data.data.order_items);
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(async ()=> {
    await getServerData();
  }, []);

  const { id, addressee_name, date_created, status } = orderDetails;
  const price = Number(orderDetails.price);
  const displayPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return(
  <div className='order-page'>
    <h2>Order Details</h2>
    {orderItems.map(item => {
      const stockDetails = stock.filter(i => i.id === item.stock_id)
      return <OrderItem item={item} stock={stockDetails[0]}/>})
    }
    <h3>Order No: {id}</h3>
    <h3>Total Paid: £{displayPrice}</h3>
    <h3>Status: {status}</h3>
    <button onClick={() => history.push(acctPath)}className="order-back"> Back to Account Page</button>
  </div>
  )
};

export default OrderPage;