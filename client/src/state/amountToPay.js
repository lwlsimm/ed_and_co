const initialState = 0;

const amountToPayReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'amountToPay/update': {
      return action.payload
    };
    default:
      return state;
  }
}


export default amountToPayReducer;