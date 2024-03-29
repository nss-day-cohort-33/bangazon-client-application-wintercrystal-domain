import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./OrderDetail.css"
import ProductRatingInput from "../products/ProductRatingInput"

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
                  "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
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

        if (productQuantities[orderProduct.product.id]) {
            productQuantities[orderProduct.product.id][0]++
        }
        else {
            productQuantities[orderProduct.product.id] = [1, orderProduct.product.price, orderProduct.id, orderProduct.product.name]
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
                    <div id="parent">
                    {
                        Object.keys(productQuantities).map(function(key) {
                            return (
                            <div key={productQuantities[key][2]} id="productRating">

                                <p>{productQuantities[key][3]} (Quantity: {productQuantities[key][0]})</p>
                                <ProductRatingInput getProducts={props.getProducts} productId={key} {...props} />
                            </div>
                    )
                        })
                    }
                    </div>
                    <h3>Total: ${total.toFixed(2)}</h3>
                </section>
            }
        </>
    )
}

export default OrderDetail