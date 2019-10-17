import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Link } from 'react-router-dom'

//Author:


const IncompleteOrder = props => {
    const [customer, setCustomer] = useState({user:{}})
    const [orderProducts, setOrderProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    // Fetch call that gets all the products within a single category. Uses a query param that passes in a category id to get specific products back and then it changes products array to hold products of that category

    const getOrderProducts = () => {
            fetch(`http://localhost:8000/orderproducts?order_id=${props.incomplete.id}`, {
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

    // First we get the open orders and then call getOrderProducts
    const getCustomers = () => {
        if (isAuthenticated()) {
            const pathArray = props.incomplete.customer.url.split('/');
            const customerId = pathArray[4]
            fetch(`http://localhost:8000/customers/${customerId}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
            .then(response => response.json())
            .then(setCustomer)
        }
    }

    // On mount get some orders
    useEffect(() => {
        getCustomers()
        getOrderProducts()
    }, [])


    // It will return components based off of the terinary statement. Which, is checkout the products array has atleast one product in it. If a category has no products in it, then it will return nothing and not populate the DOM.
    // There is a second terinary state that controls the number of products being rendered to the DOM. If the path is "/productcategories" then up to three products per category will be listed, if the path is not "/productcategories" then all products within a category will be listed.

    let productQuantities = {}
    let total = 0

    console.log(orderProducts)
    orderProducts.map(orderProduct => {
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
            <section className="order-details">
                <h4>{customer.user.first_name} {customer.user.first_name}</h4>
                <h4>Order {props.incomplete.id}</h4>
                <ul>
                    {
                        Object.keys(productQuantities).map(function(key) {
                            return (<li>{key} (Quantity: {productQuantities[key][0]})</li>)
                        })
                    }
                </ul>
                <hr></hr>
            </section>
        </>
    )
}

export default IncompleteOrder