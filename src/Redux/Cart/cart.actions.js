import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART,CART_GET_ERROR, UPDATE_CART } from './cart.actionTypes';

import { deleteAllCart, deleteCart, getCartAPI } from "./cart.api"

export const getCart = () => async(dispatch) => {
    try{
        let data = await getCartAPI();
        dispatch({type:ADD_TO_CART,payload:data})

    }catch(e){
        dispatch({type: CART_GET_ERROR})
    }
}

export const removeFromCart = (id) => async(dispatch) => {
    try{
      await deleteCart(id);
      dispatch({type:REMOVE_FROM_CART,payload:id})
    }catch(e){
      dispatch({type: CART_GET_ERROR})
    }
}


export const updateCart = (updatedCartItems) => ({
  type: UPDATE_CART,
  payload: updatedCartItems,
});

export const clearCart = () => async (dispatch) => {
  try {
    // Get the current cart items
    const cartData = await getCartAPI();
    // Delete each item one by one
    await Promise.all(cartData.map(item => deleteCart(item.id)));
    // Dispatch action to clear the cart
    dispatch({ type: CLEAR_CART });
  } catch (error) {
    dispatch({ type: CART_GET_ERROR });
  }
};