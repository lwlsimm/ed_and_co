import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './typewriter.css';
import { addNewCartItem, incrementCartItem, login, logout } from '../../state/actions';
import { useDispatch, useSelector } from 'react-redux';

const Typewriter = (props) => {

  const [itemsInBasket, setItemsInBasket] = useState(0);

  const product = props.product;
  let mode = props.mode;

  const dispatch = useDispatch();
  const history = useHistory();
  const path = `/${product.id}`;
  const cart = useSelector(state => state.cartReducer);
  
  useEffect(()=> {
    if(cart.some(obj => obj.id === product.id)) {
      const itemFromCart = cart.filter(item => item.id === product.id);
      const item = itemFromCart[0];
      setItemsInBasket(item.qty);}
  }, [])

  const getMoreInfo = () => {
    history.push(path);
  }

 

  const addItemToCart = () => {
    if(cart.some(obj => obj.id === product.id)) {
      const itemFromCart = cart.filter(item => item.id === product.id);
      const updatedItem = itemFromCart[0];
      const qty = updatedItem.qty + 1
      updatedItem.qty = qty;
      setItemsInBasket(qty)
      dispatch(incrementCartItem(updatedItem));
    } else {
      setItemsInBasket(1)
      const newItem = {
      id: product.id,
      qty: 1
      };
      dispatch(addNewCartItem(newItem));
    }
  }

  let display;
  if(mode === "ProductPage") {
    display = {display: 'none'}
  };

  //The function below checks whether items are in stock and disables the button if necessary

  return(
    <div className="typewriter" key={product.id}>
      
      <div className="sf-img-container" style={display}>
        <button onClick={getMoreInfo} className="sf-more-info" style={display}>More <br/>Info</button>
        <img className="sf-image"src={product.image} alt={product.title} style={display}/>
      </div> 
      <h3 className="sf-title" style={display}>{product.title} - £{product.price}</h3>
      <p>Items in Stock: {product.quantity - itemsInBasket}</p>
      {itemsInBasket < product.quantity ? 
      <button  onClick={() => addItemToCart()} className='sf-buybutton'>Add to Basket</button> :
      <button  onClick={() => addItemToCart()} className='sf-buybutton btn-disabled' disabled>Out of Stock</button> 
    }
      
    </div>
  )
}

export default Typewriter;