import React from 'react'
import Settings from "../../components/shop/Settings.jsx"
import DashboardHeader from '../../components/Dashboard/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Layout/DashboardSidebar'

const ShopSettings = () => {
  return (
    <div>
        <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={11} />
        </div>
        <Settings />
      </div>
    </div>
  )
}

export default ShopSettings