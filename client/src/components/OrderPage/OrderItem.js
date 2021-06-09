const OrderItem = (props) => {

  const {item, stock} = props;

  return (
    <div className="basketItem" key={item.order_id}> 
      <img className="bs-img" src={stock.image} alt={stock.title}/>
      <div className="bs-details">
        <h2>{stock.title}</h2>
        <h4>£{stock.price} x {item.quantity} = £{stock.price * item.quantity}</h4>
      </div>
      <div className="bs-qty-container">
        <div className="bs-qty">
        </div>
      </div>
    </div>
  )
};

export default OrderItem;