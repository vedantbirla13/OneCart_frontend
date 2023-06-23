import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUserOrders } from "../redux/actions/order";
import ProcessingLoader from "./Layout/ProcessingLoader";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  console.log(data);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {data && data?.status === "Processing" && (
        <div className="">
          <ProcessingLoader />
          <h1 className="font-Poppins text-2xl ">
            Your order is Processing!!{" "}
          </h1>
        </div>
      )}
      {data && data?.status === "Transferred to delivery partner" && (
        <div className="">
          <ProcessingLoader />
          <h1 className="font-Poppins text-2xl 800px:text-lg text-center ">
            Your order is Transferred to delivery partner!!{" "}
          </h1>
        </div>
      )}
      {data && data?.status === "Shipping" && (
        <div className="">
          <ProcessingLoader />
          <h1 className="font-Poppins text-2xl ">
            Your order is Shipped for delivery!!{" "}
          </h1>
        </div>
      )}
      {data && data?.status === "Received" && (
        <div className="">
          <ProcessingLoader />
          <h1 className="font-Poppins text-2xl ">
            Your order is Received for delivery!!{" "}
          </h1>
        </div>
      )}
      {data && data?.status === "On the way" && (
        <div className="">
          <ProcessingLoader />
          <h1 className="font-Poppins text-2xl ">
            Your order will be delivered today!!{" "}
          </h1>
        </div>
      )}
      {data && data?.status === "Delivered" && (
        <div className="">
          {/* <ProcessingLoader  /> */}
          <h1 className="font-Poppins text-2xl ">Your order is Delivered!! </h1>
        </div>
      )}
      {data && data?.status === "Processing refund" && (
        <div className="">
          <ProcessingLoader />
          <h1 className="font-Poppins text-2xl ">
            Your refund is Processing!!{" "}
          </h1>
        </div>
      )}
      {data && data?.status === "Refund Success" && (
        <div className="">
          <ProcessingLoader />
          <h1 className="font-Poppins text-2xl ">
            Your refund is Processed Successfully!!{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
