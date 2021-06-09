import Typewriter from '../Typwriter/Typewriter';
import './productPage.css';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProductPage = ({match}) => {


  const stock = useSelector(state => state.stockReducer);
  console.log(stock);
  const id = match.params.id;

  const product = stock.find((item) => {
    return item.id == id;
  });
  const history = useHistory();
  const homePath = `/`;
  
  return(
  <div className="prod-page">
      <div className="prod-details">
        <h2 className="prod-header">{product.title}</h2>
        <h3 className="prod-price">£{product.price} </h3>
        <div className="prod-main">
          <img className="prod-image" src={product.image} alt={product.title}/>
          <div>
            <p className="prod-desc">{product.about}</p>
            <Typewriter product={product} mode="ProductPage"/>
          </div>
        </div>  
      </div>
      <button onClick={() => history.push(homePath)}className="prod-back"><i className="fas fa-home fa-1x"/> Home</button>
  </div>
  )
}

export default ProductPage;