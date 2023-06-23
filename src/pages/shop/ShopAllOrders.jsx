import React from 'react'
import DashboardHeader from '../../components/Dashboard/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Layout/DashboardSidebar'
import AllOrders from "../../components/shop/AllOrders.jsx"

const ShopAllOrders = () => {
  return (
    <div>
        <DashboardHeader />
        <div className='flex  justify-between w-full'>
            <div className=" w-[70px] 800px:w-[330px]">
                <DashboardSidebar active={2} />
            </div>
            <div className="w-full justify-center flex">
               <AllOrders />
            </div>
        </div>
    </div>
  )
}

export default ShopAllOrders