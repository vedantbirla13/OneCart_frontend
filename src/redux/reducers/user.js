import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // Update user info
  UpdateUserInfoRequest: (state) => {
    state.loading = true;
  },
  UpdateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  UpdateUserInfoFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // Update user address
  UpdateUserAddressRequest: (state) => {
    state.userLoading = true;
  },
  UpdateUserAddressSuccess: (state, action) => {
    state.userLoading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  UpdateUserAddressFail: (state, action) => {
    state.userLoading = false;
    state.error = action.payload;
  },

  // Delete user address
  DeleteUserAddressRequest: (state) => {
    state.addressLoading = true;
  },
  DeleteUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.successMessage = action.payload.successMessage
    state.user = action.payload.user;
  },
  DeleteUserAddressFail: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.UpdateAddressSuccessMessage = null;
  },
});
