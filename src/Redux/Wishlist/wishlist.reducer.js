import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_GET_ERROR, WISHLIST_GET_LOADING } from './wishlist.actionTypes';

let initialState = {
  loading:false,
  error:false,
  wishlistData:[]
}

const wishlistReducer = (state = initialState ,{type,payload})=>{
  switch(type){
      case  WISHLIST_GET_ERROR:{
          return {
              ...state,
              loading:true
          }
      }
      case  WISHLIST_GET_LOADING:{
          return {
              ...state,
              loading:false,
              error:true,
          }
      }

      case  ADD_TO_WISHLIST:{
          return {
              ...state,
              loading:false,
              wishlistData:payload,
          }
      }

      case REMOVE_FROM_WISHLIST:{
          return {
              ...state,
              wishlistData:state.wishlistData.filter((data)=> data.id !== payload.id)
          }
      }
      default : {
          return state;
      }
  }
}

export default wishlistReducer;