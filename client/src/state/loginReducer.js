
const loginReducer = (state = false, action) => {
    switch(action.type) {
      case 'login/login': {
        return true;
      };
      case 'login/logout': {
        return false;
      };
      default: {
        return state;
      }
    }
}

export default loginReducer;