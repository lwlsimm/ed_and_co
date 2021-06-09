const initialState = []

const tokenReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'token/addTokens': {
      return action.payload;
    }
    case 'token/delete': {
      return [];
    }
    default:
      return state
  }
}

export default tokenReducer;