import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { Button } from "@mui/material";
import Table from "../Table/Table"
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updateUserAddress,
  updateUserInfo,
} from "../../redux/actions/user";
import { toast } from "react-hot-toast";
import Loader from "../Layout/Loader"
import { Country, State } from "country-state-city";
import { getAllUserOrders } from "../../redux/actions/order";
import axios from "axios";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(name, email, password, phoneNumber));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadUser())
        toast.success("Avatar updated successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full mt-6 800px:mt-0">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#17dd1f]"
              />
              <div className="w-[25px] h-[26px] bg-[#E3E9EE] rounded-full flex items-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera
                    size={20}
                    className="flex items-center justify-center cursor-pointer"
                  />
                </label>
              </div>
            </div>
            <br />
            <br />
          </div>

          <div className="w-full px-5 pt-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-5">
                <div className="w-[100%] 800px:w-[50%] ">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email</label>
                  <input
                    type="email"
                    className={`${styles.input} w-[95%]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-5">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone</label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Password</label>
                  <input
                    type="password"
                    className={`${styles.input} w-[95%]`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Update"
                required
                className={`w-[250px] h-[40px] font-Poppins text-center 
              border border-[#362a90fb] text-[#362a90fb] rounded-[3px] mt-5 cursor-pointer hover:bg-[#362a90fb] 
              hover:text-white transition-all duration-300`}
              />
            </form>
          </div>
        </>
      )}

      {/* Order page */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Order page */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order page */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Payment methods */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/* Payment methods */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

// ALL orders
const AllOrders = () => {
  const { user } = useSelector((state) => state.user)
  const { orders, isLoading } = useSelector((state) => state.order)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUserOrders(user._id))
  }, [])
  

  const columns = [
    { field: "id", headerName: "Order ID"},

    {
      field: "status",
      headerName: "Status",
      
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",

    },

    {
      field: "total",
      headerName: "Total",

    },

    {
      field: " ",
      headerName: "",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const data = [];

  orders &&
    orders.forEach((item) => {
      data.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "INR₹ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      {
        isLoading ? (
          <>
            <Loader />
          </>
        ) : (

          <Table
            data={data}
            columns={columns}
          />
        )
      }
    </div>
  );
};

//   All refund orders
const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders,isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, []);

  const eligibleOrders = orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID" },

    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
    },

    {
      field: "total",
      headerName: "Total",
    },

    {
      field: " ",
      headerName: "",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const data = [];

  eligibleOrders &&
   eligibleOrders.forEach((item) => {
      data.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "INR" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
       {
        isLoading ? (
          <>
            <Loader />
          </>
        ) : (

          <Table
            data={data}
            columns={columns}
          />
        )
      }
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user)
  const { orders,isLoading } = useSelector((state) => state.order)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUserOrders(user._id))
  }, [])
  

  const columns = [
    { field: "id", headerName: "Order ID" },

    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
    },

    {
      field: "total",
      headerName: "Total",
    },

    {
      field: " ",
      headerName: "",

      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const data = [];

  orders &&
    orders.forEach((item) => {
      data.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "INR₹ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
       {
        isLoading ? (
          <>
            <Loader />
          </>
        ) : (

          <Table
            data={data}
            columns={columns}
          />
        )
      }
    </div>
  );
};

// Change password
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/change-user-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message)
        console.log(res)
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };


  return (
    <div className="w-full px-5">
      <h1 className="text-[25px] font-[600] text-[#000000b5] pb-2 flex items-center font-Poppins justify-center mb-5">
        Change password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className="w-[95%] border font-Poppins border-[#362a90fb] h-[50px] my-8 flex 
             items-center justify-center cursor-pointer hover:bg-[#362a90fb] hover:text-white transition-all duration-300"
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addressType || !country || !city) {
      toast.error("Please fill all the fields!!");
    } else {
      dispatch(
        updateUserAddress(country, city, address1, address2, addressType, zipCode)
      );
      setOpen(false);
      setCountry("");
      setCity("");
      address1("");
      address2("");
      setZipCode("");
      setAddressType("");
      setZipCode("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000005e] z-[200] flex items-center justify-center ">
          <div className="800px:w-[50%] w-[90%] h-[80vh] bg-white rounded-sm shadow relative  overflow-y-scroll">
            <div className="w-full flex justify-end p-4">
              <RxCross1
                color="red"
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <h5 className="text-[30px] font-Poppins text-center">
              Add new address
            </h5>
            {/* Create address */}

            <form aria-required onSubmit={handleSubmit} className="p-4 w-full">
              <br />
              <div className="w-full block ">
                <div className="w-full pb-2">
                  <label htmlFor="country" className=" block pb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name=""
                    id=""
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-[100%] border h-[40px] rounded-[5px]"
                  >
                    <option value="" className="block ">
                      Choose your country
                    </option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="w-full ">
                  <label htmlFor="country" className=" block pb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    name=""
                    id=""
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-[100%] border h-[40px] rounded-[5px]"
                  >
                    <option value="" className="block ">
                      Choose your city
                    </option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <br />
              <div>
                <label htmlFor="name" className="pb-2">
                  Address1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
                            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
                  autoComplete="off"
                  placeholder="Enter your address..."
                  required
                />
              </div>

              <br />
              <div>
                <label htmlFor="name" className="pb-2">
                  Address2 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
                            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
                  autoComplete="off"
                  placeholder="Enter your address..."
                  required
                />
              </div>

              <br />
              <div>
                <label htmlFor="name" className="pb-2">
                  zip code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
                            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
                  autoComplete="off"
                  placeholder="Enter your Zip code..."
                  required
                />
              </div>

              <br />
              <div className="w-full ">
                <label htmlFor="country" className=" block pb-2">
                  Address type <span className="text-red-500">*</span>
                </label>
                <select
                  name=""
                  id=""
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="w-[100%] border h-[40px] rounded-[5px]"
                >
                  <option value="" className="block ">
                    Choose address type
                  </option>
                  {addressTypeData &&
                    addressTypeData.map((item) => (
                      <option
                        className="block pb-2"
                        key={item.name}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <br />
              <div>
                <input
                  type="submit"
                  value="Add"
                  className="w-full border font-Poppins border-[#362a90fb] h-[50px] my-4 flex 
                       items-center justify-center cursor-pointer hover:bg-[#362a90fb] hover:text-white transition-all duration-300"
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 font-Poppins">
          My Addresses
        </h1>
        <div
          className="w-[150px] h-[50px] font-Poppins flex justify-center items-center
              border border-[#362a90fb] text-[#362a90fb] rounded-[3px] 
              cursor-pointer hover:bg-[#362a90fb] hover:text-white transition-all duration-300"
          onClick={() => setOpen(true)}
        >
          <span className="font-Poppins">Add New</span>
        </div>
      </div>
      <br />

      {user &&
        user.addresses.map((item, index) => (
          <div className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5">
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.zipCode}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px] font-Poppins">
          You don't have any saved address!
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;
