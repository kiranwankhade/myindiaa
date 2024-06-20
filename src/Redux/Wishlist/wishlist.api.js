import axios from "axios";

export const getWishlistAPI = async() => {
    let res =  await axios.get(`https://cyclicbackend.onrender.com/wishList`);
    return res.data;
}

export const deleteWishlist = async(id) => {
    try{
        let res =  await axios.delete(`https://cyclicbackend.onrender.com/wishList/${id}`);
        return res;
    }catch(err){
        return err;
    }
}