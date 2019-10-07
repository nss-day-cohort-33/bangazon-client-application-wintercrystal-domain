import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Link } from 'react-router-dom'

const ProductDetail = props => {
    const [orders, setOrders] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getOrders = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/orders?customer=1`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setOrders)
        }
    }

    useEffect(getOrders, [])

    const addOrder = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/products?product=${props.product.id}`, {
                "method": "POST",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setOrders)
        }
    }

    return (
        <>
            {console.log(orders)}
            {

                <section className="product-details">
                    <h3>{props.product.name}</h3>
                    <h4>{props.product.price}</h4>
                    <p>{props.product.description}</p>
                    <h4>Quantity Available: {props.product.quantity}</h4>
                    <button>Add To Order</button>
                </section>
            }
        </>
    )
}

export default ProductDetail