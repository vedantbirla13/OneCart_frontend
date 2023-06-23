import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../components/Layout/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { categoriesData } from "../../static/data";
import { server } from "../../server";
import axios from "axios";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const { products } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState("");
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        // console.log(res.data);
        setCoupons(res.data.coupon);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios.delete(`${server}/coupon/delete-coupon/${id}`, {
      withCredentials: true,
    }).then((res) => {
      toast.success("Coupon deleted successfully")
      window.location.reload(true);
    }).catch((error) => {
      console.log(error)
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/coupon/create-coupon`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProducts,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon created successfully");
        setOpen(false);
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Coupon Id", minWidth: 150, flex: 0.7 },
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
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + "%",
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-1 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.hero_button} !w-max !h-[45px] px-2 !rounded-sm`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white ">Create coupon code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#0000005e] z-[200] flex items-center justify-center ">
              <div className="800px:w-[50%] w-[90%] h-[80vh] bg-white rounded-sm shadow relative p-4 overflow-y-scroll">
                <div className="w-full flex justify-end">
                  <RxCross1
                    color="red"
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <h5 className="text-[30px] font-Poppins text-center">
                  Create coupon code
                </h5>
                {/* Create coupon code */}

                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label htmlFor="name" className="pb-2">
                      Coupon name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
                            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
                      autoComplete="off"
                      placeholder="Enter your coupon code name..."
                      required
                    />
                  </div>

                  <br />
                  <div>
                    <label htmlFor="name" className="pb-2">
                      Discount percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
                            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
                      autoComplete="off"
                      placeholder="Enter your coupon code value..."
                      required
                    />
                  </div>

                  <br />
                  <div>
                    <label htmlFor="name" className="pb-2">
                      Min Amount
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
                            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
                      autoComplete="off"
                      placeholder="Enter your coupon code min amount..."
                    />
                  </div>

                  <br />
                  <div>
                    <label htmlFor="name" className="pb-2">
                      Max Amount
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
                            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
                      autoComplete="off"
                      placeholder="Enter your coupon code min amount..."
                    />
                  </div>

                  <br />
                  <div>
                    <label htmlFor="name" className="pb-2">
                      Selected Products
                    </label>
                    <select
                      name=""
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected product">
                        Choose a category
                      </option>
                      {products &&
                        products.map((i, index) => (
                          <option value={i.name}>
                            {i.name.slice(0, 80) + "..."}
                          </option>
                        ))}
                    </select>
                  </div>

                  <br />
                  <div>
                    <input
                      type="submit"
                      value="create"
                      className="w-full border font-Poppins border-[#362a90fb] h-[50px] my-4 flex 
                       items-center justify-center cursor-pointer hover:bg-[#362a90fb] hover:text-white transition-all duration-300"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
