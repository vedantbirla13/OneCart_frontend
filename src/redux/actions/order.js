import axios from "axios"
import { server } from "../../server"


export const getAllUserOrders = (userId) => async(dispatch) => {
        try {
            dispatch({
                type: "getAllOrdersUserRequest"
            })

            const { data } = await axios.get(`${server}/order/get-all-orders/${userId}`)

            dispatch({
                type: "getAllOrdersUserSuccess",
                payload: data.orders
            })
        } catch (error) {
            dispatch({
                type: "getAllOrdersUserFail",
                payload: error.response.data.message
            })
        }
}   

export const getAllShopOrders = (shopId) => async(dispatch) => {
        try {
            dispatch({
                type: "getAllOrdersShopRequest"
            })

            const { data } = await axios.get(`${server}/order/get-all-seller-orders/${shopId}`)

            dispatch({
                type: "getAllOrdersShopSuccess",
                payload: data.orders
            })
        } catch (error) {
            dispatch({
                type: "getAllOrdersShopFail",
                payload: error.response.data.message
            })
        }
}   
  