import './App.css'
import Nav from './components/Nav/Nav';
import HomePage from './components/HomePage/HomePage'
import ProductPage from './components/ProductPage/ProductPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import About from './components/About/About';
import Basket from './components/Basket/Basket';
import { useEffect } from 'react';
import LogIn from './components/LogIn/LogIn';
import MyAccount from './components/MyAccount/MyAccount';
import OrderPage from './components/OrderPage/OrderPage'

function App() {

  return (
  <Router>
    <div className="page">
      <Nav/>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/about" component={About}/>
        <Route path="/basket" component={Basket}/>
        <Route path="/login" component={LogIn} />
        <Route path="/account" component={MyAccount} />
        <Route path="/order/:id" component={OrderPage} />
        <Route path="/:id" component={ProductPage}/>
      </Switch>
    </div>
  </Router>
  )
}

export default App;
