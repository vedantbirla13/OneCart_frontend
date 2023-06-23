import React, { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
import { VscPackage } from "react-icons/vsc";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from "../../../redux/actions/order"
import { getAllProductsShop } from "../../../redux/actions/product";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";


const DashboardHero = () => {
    const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const [deliveredOrder, setDeliveredOrder] = useState(null)

    
  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
    dispatch(getAllProductsShop(seller._id))

    const orderData = orders && orders.filter((item) => item.status === "Delivered")
    setDeliveredOrder(orderData)
  }, [dispatch]);

  const totalEarningWithoutTax = deliveredOrder ? deliveredOrder.reduce((acc,item) => acc + item.totalPrice, 0) : 0;
  const serviceCharge = totalEarningWithoutTax * 0.1 || 0
  const availableBalance = totalEarningWithoutTax - serviceCharge || 0

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
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

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "INR₹ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[20px] font-Poppins tracking-wider pb-2">Overview</h3>

      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <GiTakeMyMoney size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000000d2] !font-Poppins`}
            >
              Account Balance{" "}
              <span className="text-[15px]">(with 10% Service charge)</span>
            </h3>
          </div>
          <div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">₹{availableBalance.toFixed(2)}</h5>
            <Link to="/dashboard-withdraw">
              <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
            </Link>
          </div>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <VscPackage size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000000d2] !font-Poppins`}
            >
              All Orders
            </h3>
          </div>
          <div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
            <Link to="/dashboard-orders">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
            </Link>
          </div>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdProductionQuantityLimits
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000000d2] !font-Poppins`}
            >
              All Products
            </h3>
          </div>
          <div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
            <Link to="dashboard-products">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
            </Link>
          </div>
        </div>
      </div>

      <br />
      <h3 className="font-Poppins tracking-wider pb-2 text-[22px]">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded shadow">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick 
        autoHeight
        pagination
      />
      </div>
    </div>
  );
};

export default DashboardHero;
