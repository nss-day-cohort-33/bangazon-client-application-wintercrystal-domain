import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

//Author:


const OrderList = props => {
    return (
        <>
            {
                <section className="order-details">
                    <Link className="nav-link" to={`/orderhistory/${props.order.id}`}>
                        <h3>Order {props.order.id}</h3>
                    </Link>

                </section>
            }
        </>
    )
}

export default OrderList