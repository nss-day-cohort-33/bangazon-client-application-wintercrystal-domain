import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import OrderList from "./OrderList"
import { Link } from 'react-router-dom'

//Author: Daniel Krusch
//Purpose: Show old orders that are complete
//Methods: Fetch get

const OrderHistory = props => {
    return (
        <>
            <h1>Completed Orders:</h1>
            {
                props.completeOrders.map(order =>
                {
                    return (<OrderList key={order.id} {...props} order={order}></OrderList>)
                })
            }
        </>
    )
}

export default OrderHistory
