import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown.jsx";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../../../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id)
    if(isItemExists){
      toast.error("Item already in cart!!")
    }else {
      if(data.stock < 1){
        toast.error("Product stock limited!!")
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart sucessfully!!")
      }
    }
}

  return (
    <div
      className={`w-full block bg-white rounded-lg shadow-sm ${
        active ? "unset" : "mb-12"
      } lg:flex p-2  `}
    >
      <div className="w-full flex items-center justify-center m-auto">
        <img src={`${backend_url}${data.images && data.images[0]}`} alt="" />
      </div>
      <div className="w-full  flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}₹
            </h5>
          </div>

          <span className="pr-3 font-[400] text-[18px] text-[#17dd1f]">
            {data.sold_out} Sold out
          </span>
        </div>

        <CountDown data={data} />
        <br />
        <div className="flex items-center justify-between">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.header_button} text-[#fff]`}>
              See details
            </div>
          </Link>
            <div className={`${styles.header_button} text-[#fff]`} onClick={() => addToCartHandler(data)}>
              Add to cart
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
