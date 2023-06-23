import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    isLoading: true
}

export const productReducer = createReducer(initialState,{
    productCreateRequest: (state) => {
        state.isLoading = true
    },
    productCreateSuccess  : (state,action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true
    },
    productCreateFail : (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false
    },

    // Get all products of shop
    getAllProductsShopRequest: (state) => {
        state.isLoading = true
    },
    getAllProductsShopSuccess : (state,action) => {
        state.isLoading = false;
        // state.success = true;
        state.products = action.payload
    },
    getAllProductsShopFail: (state,action) => {
        state.isLoading = false;
        // state.success = false;
        state.error = action.payload
    }, 

    // Delete shop product
    deleteProductRequest: (state) => {
        state.isLoading = true;
    },
    deleteProductSuccess: (state,action) => {
        state.isLoading = false;
        state.message = action.payload
    },
    deleteProductFail: (state,action) => {
        state.isLoading = false;
        state.error = action.payload
    },

     // Get all products 
     getAllProductsRequest: (state) => {
        state.isLoading = true
    },
    getAllProductsSuccess : (state,action) => {
        state.isLoading = false;
        state.allProducts = action.payload
    },
    getAllProductsFail: (state,action) => {
        state.isLoading = false;
        state.error = action.payload
    }, 
    
    clearErrors: (state) => {
        state.error = null
    },  
})