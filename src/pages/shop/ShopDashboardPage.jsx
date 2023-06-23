import React from "react";
import DashboardHeader from "../../components/Dashboard/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Dashboard/Layout/DashboardSidebar.jsx";
import DashboardHero from "../../components/Dashboard/Layout/DashboardHero.jsx";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-start w-full">
          <div className=" w-[70px] 800px:w-[330px]  ">
            <DashboardSidebar active={1} />
          </div>
          <DashboardHero />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
