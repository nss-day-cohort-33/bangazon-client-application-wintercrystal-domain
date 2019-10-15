import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import OrderList from "./OrderList"
import { Link } from 'react-router-dom'

//Author: Daniel Krusch
//Purpose: Show old orders that are complete
//Methods: Fetch get

const OrderHistory = props => {
    // Order will contain completed orders for this user
    const [orders, setOrders] = useState([])
    const { isAuthenticated } = useSimpleAuth()


    // First we get the open orders and then call getOrderProducts
    const getOrders = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/orders?`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
            .then(response => response.json())
            .then(setOrders)
        }
    }

    // On mount get some orders
    useEffect(getOrders, [])

  // This is returning a product card with a terinary statement that is checking the value of showCategory that is being passed down to this component. If showCategory is true than a link to the products category is shown, if it is not than nothing is show for the category.

    return (
        <>
            <h1>Completed Orders:</h1>
            {
                orders.map(order =>
                {
                    return (<OrderList {...props} order={order}></OrderList>)
                })
            }
        </>
    )
}

export default OrderHistory
