import React from 'react'
import DashboardHeader from '../../components/Dashboard/Layout/DashboardHeader'
import ShopRefunds from "../../components/shop/ShopRefunds.jsx"
import DashboardSidebar from '../../components/Dashboard/Layout/DashboardSidebar'

const ShopAllRefunds = () => {
  return (
    <div>
         <div>
        <DashboardHeader />
        <div className='flex  justify-between w-full'>
            <div className=" w-[70px] 800px:w-[330px]">
                <DashboardSidebar active={10} />
            </div>
            <div className="w-full justify-center flex">
               <ShopRefunds />
            </div>
        </div>
    </div>
    </div>
  )
}

export default ShopAllRefunds