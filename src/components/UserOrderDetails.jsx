import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders, getAllUserOrders } from "../redux/actions/order";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { backend_url, server } from "../server";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch]);

  const reviewHandler = async () => {
    await axios
      .post(
        `${server}/product/review-product`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllUserOrders(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(
        `${server}/order/refund-user/${id}`,
        {
          status: "Processing refund",
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllUserOrders(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className={`${styles.section} py-4 min-h-screen`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] font-Poppins tracking-wide">
            Order Details
          </h1>
        </div>
      </div>

      <div className="w-full  justify-between flex items-center pt-6">
        <h5 className="font-Poppins text-[#00000084]">
          {" "}
          Order ID: <span> #{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="font-Poppins text-[#00000084]">
          {" "}
          Placed On: <span> {data?.createdAt?.slice(0, 10)}</span>
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
              <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#000000b5]">
                  INR₹{item.discountPrice} X {item.qty}
                </h5>
              </div>
              {data?.status === "Delivered" &&
                (item.isReviewed  ? null : (
                  <div
                    className={`${styles.header_button} text-[#fff]`}
                    onClick={() => setOpen(true) || setSelectedItem(item)}
                  >
                    Write a review
                  </div>
                ))}
            </div>
          </>
        ))}

      {/* Review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-40 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <div>
              <h2 className="font-Poppins text-[30px] text-center font-[500] tracking-wide">
                Give a review
              </h2>
              <br />
              <div className="w-full flex m-4">
                <img
                  src={`${backend_url}/${selectedItem?.images[0]}`}
                  alt=""
                  className="w-[80px] h-[80px]"
                />
                <div className="pl-3 text-[20px]">
                  {selectedItem?.name}
                  <h4 className="pl-3 text-[20px] flex text-[#00000084]">
                    INR {selectedItem?.discountPrice} x {selectedItem?.qty}
                  </h4>
                </div>
              </div>
            </div>

            <br />
            <br />

            {/* Ratings */}
            <div className="ml-4">
              <h5 className="pl-3 text-[20px] font-[500]">
                Give a rating <span className="text-red-500">*</span>
              </h5>

              <div className="flex w-full ml-2 pt-1">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246, 186, 0)"
                      size={25}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246, 186, 0)"
                      size={25}
                      onClick={() => setRating(i)}
                    />
                  )
                )}
              </div>

              <br />

              <div className="w-full ml-3 items-center ">
                <label htmlFor="" className="block text-[20px] font-[500] mb-2">
                  Write a comment
                  <span className=" ml-2 font-[500] text-[16px] text-[#00000084]">
                    Optional
                  </span>
                </label>
                <textarea
                  name=""
                  id=""
                  cols="20"
                  rows="5"
                  placeholder="How was your experience?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border w-10/12 p-2"
                ></textarea>
              </div>
              <div
                className={`${styles.hero_button} text-white text-[20px] ml-3`}
                onClick={rating > 1 ? reviewHandler : null}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right mt-2">
        <h5 className="pt-3 text-[18px]">
          Total Price <strong>INR₹ {data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />

      <div className="w-full 800px:flex items-center ">
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
          <h4 className="pt-3 text-[20px] font-Poppins flex flex-col ">
            <span className="font-[600]">Type:</span>{" "}
            {<span className="text-gray-700">{data?.paymentInfo?.type}</span>}
            <span className="font-[600]">Status:</span>{" "}
            {<span className="text-gray-700">{data?.status}</span>}
          </h4>
          <br />
          {data?.status === "Delivered" && (
            <div
              className={`${styles.hero_button} text-white font-Poppins`}
              onClick={refundHandler}
            >
              Give a refund
            </div>
          )}
        </div>
      </div>

      
      <br />
      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;
