import cartReducer from './cartReducer';
import loginReducer from './loginReducer'
import stockReducer from './stockReducer';
import tokenReducer from './tokenReducer';
import amountToPayReducer from './amountToPay'


import {combineReducers} from 'redux';


const rootReducer = combineReducers({
  cartReducer: cartReducer,
  loginReducer: loginReducer,
  stockReducer: stockReducer,
  tokenReducer: tokenReducer,
  amountToPayReducer: amountToPayReducer,
})

export default rootReducer;