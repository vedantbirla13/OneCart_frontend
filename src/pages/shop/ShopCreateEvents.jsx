import React from 'react'
import DashboardHeader from '../../components/Dashboard/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Layout/DashboardSidebar'
import CreateEvent from '../../components/Dashboard/CreateEvent.jsx'

const ShopCreateEvents = () => {
  return (
    <div>
       <DashboardHeader />
        <div className='flex items-center justify-between w-full'>
            <div className=" w-[70px] 800px:w-[330px]">
                <DashboardSidebar active={6} />
            </div>
            <div className="w-full justify-center flex">
               <CreateEvent />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateEvents