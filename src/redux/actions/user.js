import axios from "axios";
import { server } from "../../server";

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getUser`, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message,
    });
  }
};

// Load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data?.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message,
    });
  }
};

// User update information
export const updateUserInfo =
  (name, email, password, phoneNumber) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserInfoRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      dispatch({
        type: "UpdateUserInfoSuccess",
        payload: data?.user,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserInfoFail",
        payload: error.response?.data?.message,
      });
    }
  };

// Update user address
export const updateUserAddress =
  (country, city, address1, address2, addressType, zipCode) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          addressType,
          zipCode,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "UpdateUserAddressSuccess",
        payload: {
          successMessage: "Address updated successfully!!",
          user: data?.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserAddressFail",
        payload: error.response?.data?.message,
      });
    }
  };

// Delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "DeleteUserAddressSuccess",
      payload: {
        successMessage: "Address deleted successfully!!",
        user: data?.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserAddressFail",
      payload: error.response?.data?.message,
    });
  }
};
