import React from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineGift,
} from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active }) => {
  return (
    <div className="w-full h-[94vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Single items */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full items-center flex">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-2 text-[18px] font-Poppins ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-orders" className="w-full items-center flex">
          <FiPackage
            size={30}
            color={`${active === 2 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-2 text-[18px] font-Poppins ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            All orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full items-center flex">
          <FiShoppingBag
            size={30}
            color={`${active === 3 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-3 text-[18px] font-Poppins ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            All products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-product"
          className="w-full items-center flex"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-3 text-[18px] font-Poppins ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            Create products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full items-center flex">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-3 text-[18px] font-Poppins ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            All events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-create-event" className="w-full items-center flex">
          <VscNewFile
            size={30}
            color={`${active === 6 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-3 text-[18px] font-Poppins ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            Create event
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-withdraw" className="w-full items-center flex">
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-3 text-[18px] font-Poppins ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            Withdraw money
          </h5>
        </Link>
      </div>


      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupons" className="w-full items-center flex">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-3 text-[18px] font-Poppins ${
              active === 9 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            Discount codes
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full items-center flex">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-3 text-[18px] font-Poppins ${
              active === 10 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full items-center flex">
          <CiSettings
            size={30}
            color={`${active === 11 ? "crimson" : "#555"} `}
          />
          <h5
            className={`pl-3 text-[18px] font-Poppins ${
              active === 11 ? "text-[crimson]" : "text-[#555]"
            } 800px:block hidden`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
