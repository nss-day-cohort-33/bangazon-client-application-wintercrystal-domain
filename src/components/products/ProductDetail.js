import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


const ProductDetail = props => {
    const [order, setOrder] = useState([])
    const [orderProduct, setOrderProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    let datestring = new Date().toISOString().slice(0,10)

    const getOrderProducts = (data) => {
            if (data.length !== 0)
            {
                console.log(data)
                setOrder(data[0])
                fetch(`http://localhost:8000/orderproducts?product_id=${props.product.id}&order_id=${data[0].id}`, {
                    "method": "GET",
                    "headers": {
                        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                    }
                })
                .then(response => response.json())
                .then(setOrderProducts)
            }
            else {
                setOrder(data)
            }
    }

    const getOrders = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/orders?customer_id=${localStorage.getItem("id")}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
            .then(response => response.json())
            .then(data => getOrderProducts(data))
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
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                    },
                    body: JSON.stringify({
                        created_date: datestring,
                        customer_id: parseInt(localStorage.getItem("id"), 10),
                        payment_id: null
                    })
                })
                .then(response => response.json())
                .then((data) => {
                    console.log(data)
                    fetch(`http://localhost:8000/orderproducts`, {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                        },
                        body: JSON.stringify({
                            order_id: data.id,
                            product_id: props.product.id,
                            quantity: 1
                        })
                    })
                    .then(response => response.json())
                    .then(getOrders)
                })
            }
            else {
                if (orderProduct.length === 0)
                {
                    console.log("goodbye")
                    console.log(order)
                    fetch(`http://localhost:8000/orderproducts`, {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                        },
                        body: JSON.stringify({
                            order_id: order.id,
                            product_id: props.product.id,
                            quantity: 1
                        })
                    })
                }
                else {
                    fetch(`http://localhost:8000/orderproducts/${orderProduct[0].id}`, {
                        "method": "PUT",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                        },
                        body: JSON.stringify({
                            quantity: (orderProduct[0].quantity += 1)
                        })
                    })
                }
            }
        }
    }

    return (
        <>
            {

                <section className="product-details">
                    <h3>{props.product.name}</h3>
                    <h4>{props.product.price}</h4>
                    <p>{props.product.description}</p>
                    <h4>Quantity Available: {props.product.quantity}</h4>
                    {
                      isAuthenticated() ?
                      <button onClick={addOrder}>Add To Order</button>
                      :
                      ""
                    }

                </section>
            }
        </>
    )
}

export default ProductDetail