import axios from "axios";

export const getOrdersAPI = async() => {
    let res =  await axios.get(`https://cyclicbackend.onrender.com/watchlist`);
    return res.data;
}

export const deleteOrders = async(id) => {
    try {
        let res = await axios.delete(`https://cyclicbackend.onrender.com/watchlist/${id}`);
        // console.log('res:', res)
        return res;
      } catch (err) {
        return err;
      }
}
