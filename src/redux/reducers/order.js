import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    isLoading: true
}

export const orderReducer = createReducer(initialState,{


    // Get all products of user
    getAllOrdersUserRequest: (state) => {
        state.isLoading = true
    },
    getAllOrdersUserSuccess : (state,action) => {
        state.isLoading = false;
        // state.success = true;
        state.orders = action.payload
    },
    getAllOrdersUserFail: (state,action) => {
        state.isLoading = false;
        // state.success = false;
        state.error = action.payload
    }, 

    // Get all products of shop
    getAllOrdersShopRequest: (state) => {
        state.isLoading = true
    },
    getAllOrdersShopSuccess : (state,action) => {
        state.isLoading = false;
        // state.success = true;
        state.orders = action.payload
    },
    getAllOrdersShopFail: (state,action) => {
        state.isLoading = false;
        // state.success = false;
        state.error = action.payload
    }, 
 
    
    clearErrors: (state) => {
        state.error = null
    },  
})