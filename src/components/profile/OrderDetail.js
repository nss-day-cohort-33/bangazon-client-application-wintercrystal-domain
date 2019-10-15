import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

//Author:


const OrderDetail = props => {
    const [orderProducts, setOrderProducts] = useState([])

    // Fetch call that gets all the products within a single category. Uses a query param that passes in a category id to get specific products back and then it changes products array to hold products of that category

    const getOrderProducts = () => {
            fetch(`http://localhost:8000/orderproducts?order_id=${props.order.id}`, {
                "method": "GET",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(setOrderProducts)
    }

    useEffect(getOrderProducts, [])

    // It will return components based off of the terinary statement. Which, is checkout the products array has atleast one product in it. If a category has no products in it, then it will return nothing and not populate the DOM.
    // There is a second terinary state that controls the number of products being rendered to the DOM. If the path is "/productcategories" then up to three products per category will be listed, if the path is not "/productcategories" then all products within a category will be listed.

    let productQuantities = {}
    let total = 0

    orderProducts.map(orderProduct => {
        // const pathArray = orderProduct.product.url.split('/');
        // const productId = pathArray[4]
        if (productQuantities[orderProduct.product.name]) {
            productQuantities[orderProduct.product.name][0]++
        }
        else {
            productQuantities[orderProduct.product.name] = [1, orderProduct.product.price]
        }
    })

    Object.keys(productQuantities).map(function(key) {
        total += (productQuantities[key][0] * productQuantities[key][1])
    })

    return (
        <>
            {
                <section className="order-details">
                    <h3>Order {props.order.id}</h3>
                    <h5>Payment Type: {props.order.payment_type.merchant_name}</h5>
                    <h4>Products:</h4>
                    <ul>
                    {
                        Object.keys(productQuantities).map(function(key) {
                            return (<li>{key} (Quantity: {productQuantities[key][0]})</li>)
                        })
                    }
                    </ul>
                    <h3>Total: ${total}</h3>
                </section>
            }
        </>
    )
}

export default OrderDetail