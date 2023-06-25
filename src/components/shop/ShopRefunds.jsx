import React, { useEffect } from "react";
import { Button } from "@mui/material";
import Table from "../Table/Table"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllShopOrders } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";

const ShopRefunds = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
  }, [dispatch]);

  const refundOrders = orders && orders.filter((item) => item.status === "Processing refund" || item.status === "Refund Success" )

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
            <Link to={`/order/${params.id}`}>
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

  refundOrders &&
  refundOrders.forEach((item) => {
      data.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "INR " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <Table
            data={data}
            columns={columns}

          />
        </div>
      )}
    </>
  );
};

export default ShopRefunds;