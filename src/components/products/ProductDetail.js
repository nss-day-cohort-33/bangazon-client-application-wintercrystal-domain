import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Link } from 'react-router-dom'

const ProductDetail = props => {
    const [order, setOrder] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const datestring = new Date().toISOString().slice(0,10)

    const getOrders = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/orders?customer_id=${localStorage.getItem("id")}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
            .then(response => response.json())
            .then(setOrder)
        }
    }

    useEffect(getOrders, [])

    const addOrder = () => {
        if (isAuthenticated()) {
            if (order.length === 0) {
                console.log("hello")
                fetch(`http://localhost:8000/orders`, {
                    "method": "POST",
                    "headers": {
                        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                    },
                    body: JSON.stringify({
                        created_date: datestring,
                        customer_id: parseInt(localStorage.getItem("id"), 10),
                        payment_id: null
                    })
                })
                .then(response => response.json)
                .then((data) => {
                    fetch(`http://localhost:8000/orderproducts`, {
                        "method": "POST",
                        "headers": {
                            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                        },
                        body: JSON.stringify({
                            order_id: data.id,
                            product_id: props.product.id,
                            quantity: 1
                        })
                    })
                })
            }
            else {
                console.log("goodbye")
                fetch(`http://localhost:8000/orderproducts`, {
                    "method": "POST",
                    "headers": {
                        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                    },
                    body: JSON.stringify({
                        order_id: order.id,
                        product_id: props.product.id,
                        quantity: 1
                    })
                })
            }
        }
    }

    return (
        <>
            {console.log(order)}
            {

                <section className="product-details">
                    <h3>{props.product.name}</h3>
                    <h4>{props.product.price}</h4>
                    <p>{props.product.description}</p>
                    <h4>Quantity Available: {props.product.quantity}</h4>
                    <button onClick={addOrder}>Add To Order</button>
                </section>
            }
        </>
    )
}

export default ProductDetail