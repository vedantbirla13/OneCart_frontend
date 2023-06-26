import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../server";
import styles from "../styles/styles";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllProductsShop } from "../redux/actions/product";
import { getAllEventsShop } from "../redux/actions/event";

const ShopInfo = ({ isOwner }) => {
  // const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product)
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllProductsShop(id))
    setIsLoading(true)
    axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
      setData(res.data.shop)
      setIsLoading(false)
    }).catch((error) => {
      console.log(error)
      setIsLoading(false)
    })
  }, []);


  const logoutHandler = async() => {
    await axios.get(`${server}/shop/logoutSeller`, {
      withCredentials: true
    }).then((res) => {
      toast.success("Logout successful")
      navigate("/shop-login")
      window.location.reload(true)
    }).catch((error) => {
      console.log(error.response.data.message);
    });
  }

  const totalReviewsLength =
  products &&
  products.reduce((acc, product) => acc + product.reviews.length, 0);

const totalRatings =
  products &&
  products.reduce(
    (acc, product) =>
      acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
    0
  );

const avg = totalRatings / totalReviewsLength || 0;

const averageRating = avg.toFixed(2);

  return (
    <div>
      <div className="w-full py-5 ">
        <div className="w-full flex items-center justify-center ">
          <img
            src={`${backend_url}${data?.avatar}`}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px] font-Poppins">
          {data?.name}
        </h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {data?.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6] font-Poppins">{data?.address}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6] font-Poppins">{data?.phone}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6] font-Poppins">{products && products.length}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000a6] font-Poppins">{averageRating}/5</h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Joined on</h5>
        <h4 className="text-[#000000a6] font-Poppins">
          {data?.createdAt?.slice(0,10)}
        </h4>
      </div>
      {
        isOwner && (
            <div className="py-3 px-4">
                <Link to="/settings" className={`${styles.hero_button} !w-full !h-[42px] !rounded-[5px]`}>
                    <span className="text-white font-Poppins">Edit shop</span>
                </Link>
                <div className={`${styles.hero_button} !w-full !h-[42px] !rounded-[5px]`} onClick={logoutHandler}>
                    <span className="text-white font-Poppins">Log out</span>
                </div>
            </div>
        )
      }
    </div>
  );
};

export default ShopInfo;
