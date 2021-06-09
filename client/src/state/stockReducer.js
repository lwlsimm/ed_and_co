const initialState = []

const stockReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'stock/loadStock': {
      return action.payload;
    }
    default:
      return state
  }
}

export default stockReducer;