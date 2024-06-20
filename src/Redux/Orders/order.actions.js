import { ADD_ORDER, REMOVE_ORDER, CLEAR_ORDERS,ORDER_GET_ERROR } from './order.actionTypes';
import { deleteOrders, getOrdersAPI } from './orders.api';

export const getOrders = () => async(dispatch) => {
  try{
      let data = await getOrdersAPI();
      dispatch({type:ADD_ORDER,payload:data})

  }catch(e){
      dispatch({type: ORDER_GET_ERROR})
  }
}


export const removeFromOrders = (id) => async(dispatch) => {
  try{
    await deleteOrders(id);
    dispatch({type:REMOVE_ORDER,payload:id})
  }catch(e){
    dispatch({type: ORDER_GET_ERROR})
  }
}