import './nav.css'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {

  const loggedIn = useSelector(state => state.loginReducer);

  const history = useHistory();
  const aboutPath = '/about';
  const homePath = '/';
  const basketPath = '/basket';
  const logInPath = '/login';
  const acctPath = '/account';

  return(
    <div className="navbar">
      <div className="leftNavText" onClick={() => history.push(homePath)}>
        <h1 className="navHeader">Edward & Co.</h1>
        <h3 className="navQuote">Antique Typerwriters</h3>
      </div>
      <div className="rightNavText">
        <button className="navBtn" onClick={() => history.push(aboutPath)}>About Us</button>
        {loggedIn ? 
          <button onClick={() => history.push(acctPath)}
          className="navBtn">
            My Account
          </button>
        :
          <button onClick={() => history.push(logInPath)}
          className="navBtn">
            Login <br/> /Register
          </button>
        }
        
        <button 
        onClick={() => history.push(basketPath)}
        className="navBtn"><i  className="fas fa-shopping-basket fa-1x"/>Basket</button>
      </div>
    </div>
  )
}

export default Nav;