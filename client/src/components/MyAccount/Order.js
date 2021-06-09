import './address.css';
import { useHistory } from 'react-router-dom';

const Order = (props) => {

  const path = `/order/${props.id}`;
  const history = useHistory();

  const getMoreInfo = (e) => {
    e.preventDefault();
    history.push(path);
  }

  return (
    <div key={props.id} className="address">
    
      <p>Order No: {props.id}</p>
      <p>Date Placed: {props.dateCreated.substring(0,10)}</p>
      <p>Total Paid: £{props.price}</p>
      <p>Current Status: {props.status}</p>
      <button onClick={e => getMoreInfo(e)} className="add-update">More Info</button>
    
    </div>
  )
};

export default Order;