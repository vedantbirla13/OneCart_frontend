import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from "../redux/actions/order";
import { backend_url, server } from "../server";
import { toast } from "react-hot-toast";
import axios from "axios";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [status, setStatus] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);
  // console.log(data?.status)

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated");
        navigate("/dashboard-orders")
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async(e) => {
    await axios
    .put(
      `${server}/order/refund-user-success/${id}`,
      {
        status,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Order updated");
      dispatch(getAllShopOrders(seller._id))

    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  return (
    <div className={`${styles.section} py-4 min-h-screen`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] font-Poppins tracking-wide">
            Order Details
          </h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560]  !h-[45px] text-[18px] font-Poppins tracking-wide`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full  justify-between flex items-center pt-6">
        <h5 className="font-Poppins text-[#00000084]">
          {" "}
          Order ID: <span> #{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="font-Poppins text-[#00000084]">
          {" "}
          Placed On: <span> #{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* Order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <>
            <div className="w-full flex items-start mb-5">
              <img
                src={`${backend_url}/${item.images[0]}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
            </div>
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#000000b5]">
                ₹{item.discountPrice} X {item.qty}
              </h5>
            </div>
          </>
        ))}

      <div className="border-t w-full text-right mt-2">
        <h5 className="pt-3 text-[18px]">
          Total Price <strong>INR₹ {data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />

      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px] font-Poppins">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2 +
              ","}
          </h4>

          <h4 className="pt-3 text-[20px] font-Poppins">
            {data?.shippingAddress?.country + ","}
          </h4>
          <h4 className="pt-3 text-[20px] font-Poppins">
            {data?.shippingAddress?.city}
          </h4>
          <h4 className="pt-3 text-[20px] font-Poppins">
            {data?.user?.phoneNumber && "+91" + data?.user?.phoneNumber}
          </h4>
        </div>

        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-Poppins font-[600]">
            Payment Info
          </h4>
          <h4 className="pt-3 text-[20px] font-Poppins ">
            <span className="font-[600]">Status:</span>{" "}
            {<span className="text-gray-700">{data?.status}</span>}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <br />

      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[250px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : (
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-[250px] mt-2 border h-[35px] rounded-[5px]" >
          {[
                "Processing refund",
                "Refund Success"
              ]
                .slice(
                  [
                    "Processing refund",
                    "Refund Success"
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
          </select>
        )}

        {/* {
          data?.status === "Processing refund" || data?.status === "Refund Success" && (
        
          )
        } */}
      
      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
