import axios from "axios";

export const getCartAPI = async() => {
    let res =  await axios.get(`https://cyclicbackend.onrender.com/cart`);
    // console.log('res:', res.data)
    return res.data;
}

export const deleteCart = async(id) => {
    try {
        let res = await axios.delete(`https://cyclicbackend.onrender.com/cart/${id}`);
        return res;
      } catch (err) {
        return err;
      }
}
