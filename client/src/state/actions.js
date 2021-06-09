

export const addNewCartItem = item => {
  return {
    type: 'cart/addNewCartItem',
    payload: item
  }
}

export const incrementCartItem = item => {
  return {
    type: 'cart/incrementCartItem',
    payload: item
  }


}
export const decrementCartItem = item => {
  return {
    type: 'cart/decrementCartItem',
    payload: item
  }

}

export const deleteCartItem = item => {
  return {
    type: 'cart/deleteCartItem',
    payload: item
  }
}

export const emptyCart = () => {
  return {
    type: 'cart/empty',
  }
}

export const login = () => {
  return {
    type: 'login/login'
  }
}

export const logout = () => {
  return {
    type: 'login/logout'
  }
}

export const loadStock = stock => {
  return {
    type: 'stock/loadStock',
    payload: stock
  }
}
export const addTokens = tokens => {
  return {
    type: 'token/addTokens',
    payload: tokens
  }
}

export const deleteTokens = () => {
  return {
    type: 'token/delete',
  }
}

export const updateAmountToPay = (amount) => {
  return {
    type: 'amountToPay/update',
    payload: amount,
  }
}

