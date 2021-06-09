import { useDispatch, useSelector } from 'react-redux';
import { incrementCartItem, decrementCartItem, updateAmountToPay } from '../../state/actions';
import './basket.css';


const BasketItem = (props) => {

  const stock = useSelector(state => state.stockReducer);
  const cartItems = useSelector(state => state.cartReducer);

  const {id, title, price, image}  = stock.find(item => item.id === props.product.id);
  const stockItem = stock.find(i => i.id == id);
  let qty = 0
  
  cartItems.map(item => {
    if(item.id === id) {
      qty = qty + item.qty
    }
  });
  
  const dispatch = useDispatch();

  const handleDelete = () => {
    const prod = props.product
    prod.qty = 0;
    dispatch(decrementCartItem(prod));
    updateAmount()
  }

  const handleIncrement = () => {
    const maxQty = stockItem.quantity;
    if(qty < maxQty){
      const prod = props.product
      prod.qty = qty + 1;
      dispatch(incrementCartItem(prod));
      updateAmount()
    }
  }

  const handleDecrement = () => {
    const prod = props.product
    prod.qty = qty - 1;
    dispatch(decrementCartItem(prod));
    updateAmount()
  }


  const updateAmount = () => {
    const items = [];
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

  if(qty < 1) {
    return (null)
  }

  return (
    <div className="basketItem" key={id}> 
      <img className="bs-img" src={image} alt={title}/>
      <div className="bs-details">
        <h3>{title}</h3>
        <p>£{price} x {qty} = £{price * qty}</p>
      </div>
      <div className="bs-qty-container">
        <p className="bs-qty-tag">Quantity</p>
        <div className="bs-qty">
          <button onClick={() => handleIncrement()} className="bs-qtyBtn">+</button>
          <p className="bs-qty-no">{qty}</p>
          <button onClick={() => handleDecrement()} className="bs-qtyBtn">-</button>
        </div>
      </div>
      <div className="bs-del-container">
        <i class="fas fa-trash fa-2x bs-del" onClick={() => handleDelete()}></i>
      </div>
    </div>
  )
}

export default BasketItem;