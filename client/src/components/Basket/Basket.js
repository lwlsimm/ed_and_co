import { useDispatch, useSelector } from 'react-redux';
import BasketItem from './BasketItems';
import { useEffect } from 'react';
import CreditCard from './CreditCard'
import { useHistory } from 'react-router-dom';
import { updateAmountToPay } from '../../state/actions';

const Basket = () => {

  //const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch()  
  const amountToPay = useSelector(state => state.amountToPayReducer)
  const cartItems = useSelector(state => state.cartReducer);
  const stock = useSelector(state => state.stockReducer);
  const loggedIn = useSelector(state => state.loginReducer);
  const history = useHistory();

  const updateAmount = () => {
    let total = 0;
    if(cartItems.length > 0) {
      cartItems.map(item => {
        if(item.qty > 0) {
          const stockItem = stock.find(i => i.id == item.id);
          total = total + (item.qty * stockItem.price)
        }
      })
    dispatch(updateAmountToPay(total))
    } else {
    dispatch(updateAmountToPay(0))
    }
  }

  if(!loggedIn) {
    history.push('/login')
  }

  useEffect(()=> {
    if(!loggedIn) {
      history.push('/login')
      return
    }
    updateAmount()
  }, [])


  return (
    <div className="bs-page">
      <h2 className="bs-heading">Basket</h2>
      {cartItems.length > 0 ? cartItems.map(item =>
        <BasketItem product={item}/>)
      :
      null}
      <div className="amount-to-pay">
        <h2>Amount to Pay : £{amountToPay}</h2>
      </div>
      {loggedIn ? <CreditCard/> : null}
    </div>
  )
}

export default Basket;