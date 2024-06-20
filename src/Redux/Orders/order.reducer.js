import { ADD_ORDER, REMOVE_ORDER, CLEAR_ORDERS } from './order.actionTypes';

const initialState = {
  loading:false,
  error:false,
  orders:[]
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};

export default ordersReducer;
