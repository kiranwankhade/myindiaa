import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART,CART_GET_ERROR, UPDATE_CART } from './cart.actionTypes';

let initialState = {
  loading:false,
  error:false,
  cartData:[]
}

const cartReducer = (state = initialState ,{type,payload})=>{
  switch(type){
      case  CART_GET_ERROR:{
          return {
              ...state,
              loading:true
          }
      }

      case  ADD_TO_CART:{
          return {
              ...state,
              loading:false,
              cartData:payload,
          }
      }

      case REMOVE_FROM_CART:{
          return {
              ...state,
              cartData:state.cartData.filter((data)=> data.id !== payload.id)
          }
      }

      case UPDATE_CART:
      return {
        ...state,
        cartData: payload,
      };

      case CLEAR_CART:
      return {
        ...state,
        cartData: [] // Reset cart data to an empty array
      };


      default : {
          return state;
      }
  }
}


export default cartReducer;