import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productData } from "../static/data";
import ProductCard from "./Route/ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/styles";
import { getAllProductsShop } from "../redux/actions/product";
import { getAllEventsShop } from "../redux/actions/event";
import { backend_url } from "../server";
import Ratings from "./Route/ProductCard/Ratings";


const ShopProfileData = ({ isOwner }) => {


  const [active, setActive] = useState(1);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.events);
  
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);


  const allReviews = products && products.map((product) => product.reviews).flat()

  return (
    <div className="w-full py-5 ">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[500] text-[20px] ${
                active === 1
                  ? "text-red-500"
                  : "text-[#362a90fb]"
              }  font-Poppins cursor-pointer pr-[30px]`}
            >
              Shop products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[500] text-[20px] ${
                active === 2
                  ? "text-red-500"
                  : "text-[#362a90fb]"
              }  font-Poppins cursor-pointer pr-[30px]`}
            >
              Running events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[500] text-[20px] ${
                active === 3
                  ? "text-red-500"
                  : "text-[#362a90fb]"
              }  font-Poppins cursor-pointer pr-[30px]`}
            >
              Shop reviews
            </h5>
          </div>
        </div>

        {isOwner && (
          <div>
            <Link to="/dashboard">
              <div className={`${styles.hero_button} h-[42px]`}>
                <span className="text-[#fff]">Go Dashboard</span>
              </div>
            </Link>
          </div>
        )}
      </div>

      <br />

      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {
          products && products.map((i,index) => (
            <ProductCard data={i} key={index} />
          ))}
        </div>
      )}


      {active === 2 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {
          events && events.map((i,index) => (
            <ProductCard data={i} key={index} isShop={true} isEvent={true} />
          ))}
        </div>
      )}


      {active === 3 && (
        <div className="w-full">
            {
              allReviews && allReviews.map((item,index) => (
                <div className="w-full flex my-4">
                  <img src={`${backend_url}/${item.user.avatar}`} className="w-[50px] h-[50px] rounded-full" alt="" />
                  <div className="pl-2">
                    <div className="flex w-full items-center">
                      <h1 className="font-Poppins font-[600] pr-2">{item.user.name}</h1>
                      <Ratings rating={item.rating} />
                    </div>
                      <p className="font-Poppins text-[#000000a7]">{item?.comment}</p>
                      <p>{item.createdAt.slice(0,10)}</p>
                  </div>
                </div>
              ))
            }
        </div>
      )}


    </div>
  );
};

export default ShopProfileData;
