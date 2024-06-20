import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_GET_ERROR, WISHLIST_GET_LOADING } from './wishlist.actionTypes';

import { deleteWishlist, getWishlistAPI } from "./wishlist.api"

export const getWishlist = () => async(dispatch) => {
    dispatch({type: WISHLIST_GET_LOADING});
    try{
        let data = await getWishlistAPI();
        dispatch({type:ADD_TO_WISHLIST,payload:data})

    }catch(e){
        dispatch({type: WISHLIST_GET_ERROR})
    }
}

export const removeFromWishlist = (id) => async(dispatch) => {
    await deleteWishlist(id);
    dispatch({type:REMOVE_FROM_WISHLIST,payload:id})
}