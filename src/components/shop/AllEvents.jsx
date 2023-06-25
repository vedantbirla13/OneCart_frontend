import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import  Loader  from "../../components/Layout/Loader"
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";


const AllEvents = () => {

  const { isLoading, events } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id))
    // toast.success("product deleted succesfully")
    window.location.reload(true)
  }

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        // const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20}  />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events && events.forEach((item) => {
    row.push({
        id: item._id,
        name: item.name,
        price: "INR₹ " + item.discountPrice,
        Stock: item.stock,
        sold: 10,
    });
  });

  return (
    <>
        {
            isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <DataGrid 
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )

            
        }

        
        
    </>
  );
};

export default AllEvents;
