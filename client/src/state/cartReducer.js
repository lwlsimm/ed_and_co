const initialState = []

const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'cart/addNewCartItem': {
      const newItem = {id: action.payload.id, qty: 1}
      return [...state, newItem]
    };
    case 'cart/incrementCartItem': {
      const id = action.payload.id;
       return state.map(item => {
         if (item.id === id) {
          item = action.payload
         }
         return item
       })
    };
    case 'cart/decrementCartItem': {
      const id = action.payload.id;
      return state.map(item => {
        if (item.id === id) {
         item = action.payload
        }
        return item
      })
    };
    case 'cart/deleteCartItem': {
      return state.filter(item => item.id !== action.payload.id)
    };
    case 'cart/empty': {
      return []
    };
    default:
      return state;
  }
}


export default cartReducer;