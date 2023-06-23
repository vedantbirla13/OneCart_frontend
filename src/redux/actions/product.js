import axios from "axios"
import { server } from "../../server"


export const createProduct = (newForm) => async(dispatch) => {
    try {
        dispatch({
            type: "productCreateRequest",
        })

        const config = {headers: {"Content-Type": "multipart/form-data"} };
        const { data } = await axios.post(`${server}/product/create-product`, newForm, config)

        dispatch({
            type: "productCreateSuccess",
            payload: data.product
        });

    } catch (error) {
        dispatch({
            type: "productCreateFail",
            payload: error.response.data.message
        });        
    }
}


// Get all shop products 
export const getAllProductsShop = (id) => async(dispatch) => {
    try {
        dispatch({
            type:"getAllProductsShopRequest"
        });

        const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`)
        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: "getAllProductsShopFail",
            payload: error.response.data.message
        })
    }
}

// Delete a product
export const deleteProduct = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "deletePRoductRequest"
        });

        const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`, {
            withCredentials: true
        })

        dispatch({
            type:"deleteProductSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "deleteProductFail",
            payload: error.response.data.message
        })
    }
}

// Get all  products 
export const getAllProducts = () => async(dispatch) => {
    try {
        dispatch({
            type:"getAllProductsRequest"
        });

        const { data } = await axios.get(`${server}/product/get-all-products`)
        dispatch({
            type: "getAllProductsSuccess",
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: "getAllProductsFail",
            payload: error.response.data.message
        })
    }
}