import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


// By Daniel Krusch
const ProductDetail = props => {
    // Order will contain open orders for this user (i.e ones with payment type of null)
    const [order, setOrder] = useState([])
    // Order Product will contain an order product relation row if it exists
    const [orderProduct, setOrderProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    // For the created date field in order
    let datestring = new Date().toISOString().slice(0,10)

    // Follows getOrders, will set a new order
    const getOrderProducts = (data) => {
            // If there exists an open order, then we will fetch the order_product relation for that order
            // if there isnt an open order we'll just set the order and leave orderProduct empty
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

    // First we get the open orders and then call getOrderProducts
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

    // On mount get some orders
    useEffect(getOrders, [])

    // Will post orders and order products on click of the add to order button
    const addOrder = () => {
        // Checks that user is valid
        if (isAuthenticated()) {
            // If an open order does not exist one will be created, then an order_product relation will be created
            // with an order_id of the order just created and a product id of the current product
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
            // If an open order already exists we don't have to create one, we can just create the order_product
            // relation
            else {
                // If an order product relation does not exist, make one
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
                // If an order product relation does exist update the quantity on click of add to order
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
                    <h4>{props.product.price.toFixed(2)}</h4>
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