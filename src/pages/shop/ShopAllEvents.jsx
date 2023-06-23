import React from 'react'
import DashboardHeader from '../../components/Dashboard/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Layout/DashboardSidebar'
import AllEvents from "../../components/shop/AllEvents.jsx"


const ShopAllEvents = () => {
  return (
    <div>
         <DashboardHeader />
        <div className='flex justify-between w-full'>
            <div className=" w-[70px] 800px:w-[330px]">
                <DashboardSidebar active={5} />
            </div>
            <div className="w-full justify-center flex">
               <AllEvents />
            </div>
        </div>
    </div>
  )
}

export default ShopAllEvents