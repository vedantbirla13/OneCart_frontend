import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from '../../redux/actions/order';
import styles from '../../styles/styles';

const WithdrawMoney = () => {
    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    
    const [deliveredOrder, setDeliveredOrder] = useState(null)
    useEffect(() => {
        dispatch(getAllShopOrders(seller._id));
    
        const orderData = orders && orders.filter((item) => item.status === "Delivered")
        setDeliveredOrder(orderData)
      }, [dispatch]);

      const totalEarningWithoutTax = deliveredOrder && deliveredOrder.reduce((acc,item) => acc + item.totalPrice, 0);
      const serviceCharge = totalEarningWithoutTax * 0.1
      const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2)

      console.log(availableBalance)

  return (
    <div className='w-full h-[90vh] p-8'>
        <div className='w-full bg-white h-full rounded flex items-center justify-center flex-col text-center'>
                <h5 className='font-Poppins text-2xl tracking-wider pb-2'>Available balance: ₹{availableBalance}</h5>
                <div className={`${styles.hero_button} text-white font-Poppins`}>Withdraw</div>
        </div>
    </div>
  )
}

export default WithdrawMoney