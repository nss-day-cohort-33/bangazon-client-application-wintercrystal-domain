import React, { useEffect, useState, useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Link } from 'react-router-dom'
import "./ProductDetail.css"



//Author: Daniel Krusch
//Purpose: Shows a the details of the product the clicked on the home or product categories page
//Methods: Will create an order or order product based on if an order exists or not for that user
const ProductDetail = props => {
    // Order will contain open orders for this user (i.e ones with payment type of null)
    const [order, setOrder] = useState([])
    // Order Product will contain an order product relation row if it exists
    const [orderProduct, setOrderProducts] = useState([])
    const [productQuantity, setProductQuantity] = useState(props.product.quantity)
    const { isAuthenticated } = useSimpleAuth()
    const [count_cart, setCount_Cart] = useState(0)
    let dialog = document.querySelector("#dialog--time")
    const [isOpen, setIsOpen] = useState(false)
    const quantity = useRef()




    // For the created date field in order
    let datestring = new Date().toISOString().slice(0,10)

    //toggles modal for adding inventory to product using local state variables
    const toggleDialog = () => {
        setIsOpen(!isOpen)
        if (isOpen) {
            dialog.removeAttribute("open")
            window.removeEventListener("keyup", handler)
        } else {
            dialog.setAttribute("open", true)
        }
    }

    // Follows getOrders, will set a new order
    const getOrderProducts = (data) => {
            // If there exists an open order, then we will fetch the order_product relation for that order
            // if there isnt an open order we'll just set the order and leave orderProduct empty
            if (data.length !== 0)
            {
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
            fetch(`http://localhost:8000/orders?customer_id=${localStorage.getItem("id")}&complete=0`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
            .then(response => response.json())
            .then(data => {
              getOrderProducts(data)
            })
        }
    }

    const handler = e => {
    // Close all dialogs when ESC is pressed, and close search field
    if (e.keyCode === 27) {
        if (isOpen) {
            toggleDialog()
        }
        }
}


    // On mount get some orders
    useEffect( getOrders, [])


    // Will post orders and order products on click of the add to order button
    const addOrder = () => {
        // Checks that user is valid
        if (isAuthenticated()) {
            // If an open order does not exist one will be created, then an order_product relation will be created
            // with an order_id of the order just created and a product id of the current product
            if (order.length === 0) {
                fetch(`http://localhost:8000/orders`, {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                    },
                    body: JSON.stringify({
                        created_date: datestring,
                        customer_id: parseInt(localStorage.getItem("id"), 10)
                    })
                })
                .then(response => response.json())
                .then((data) => {
                    fetch(`http://localhost:8000/orderproducts`, {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                        },
                        body: JSON.stringify({
                            order: data.id,
                            product: props.product.id,
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
                fetch(`http://localhost:8000/orderproducts`, {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                    },
                    body: JSON.stringify({
                        order: order.id,
                        product: props.product.id,
                        quantity: 1
                    })

                })
                .then(response => response.json())
                .then(getOrders)
            }
        }
    }

    //Conditionally renders update product button if product belongs to user and has inventory of 0
    const renderUpdateBtn = () => {
        if ((+props.product.customer.url.slice(-1) === +localStorage.getItem("id")) && (productQuantity === 0)) {
            window.addEventListener("keyup", handler)
            return <button className="item" id="update-btn" onClick={toggleDialog}>Update</button>
    }
}
    //updates quantity of a product, closes modal and fetches
    const updateProductQuantity = (e) => {
        if (isAuthenticated() && quantity.current.value > 0 && quantity.current.value % 1 === 0) {
            fetch(`http://localhost:8000/products/${props.product.id}`, {
                "method": "PUT",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                },
                "body": JSON.stringify({
                  "quantity": quantity.current.value
            })

        })
        .then(() => {
            dialog.removeAttribute("open")
            setProductQuantity(quantity.current.value)
            })


    }
    else {
        e.preventDefault()
        window.alert("Please add a quantity that is greater than 0")
    }
    }
    return (
        <>
            <dialog id="dialog--time" className="dialog--time" onKeyUp={(event) => {handler(event)}}>
                <label htmlFor="starttime">How Many Items Would You Like to Add to the Product Inventory?</label>
                <input  type="text" ref={quantity} name="quantity" autoFocus required />

                <button className="item"
                onClick = {updateProductQuantity}>Update Inventory</button>

            </dialog>
            {
                <section className="product-details">
                    <h3>{props.product.name}</h3>
                    <button onClick={() => {console.log(`recommend friend${props.product.name}`)}}>Recommend To A Friend</button>
                    <h4><font size="1">Posted By: {props.product.customer.user.first_name} {props.product.customer.user.last_name}</font></h4>
                    <h5>${props.product.price.toFixed(2)} <font size="1">(per one)</font></h5>
                    <p>{props.product.description}</p>
                    <div id="product-quantity">
                    <h4>Quantity: {productQuantity}<font size="1"> available</font></h4>
                    {renderUpdateBtn()}
                    </div>
                    {
                      isAuthenticated() ?
                      count_cart < props.product.quantity ?
                      <button onClick={() => {

                        if (count_cart < props.product.quantity) {
                          addOrder()
                          setCount_Cart(count_cart+1)
                        }
                        console.log(count_cart)
                      }}>Add To Order</button>
                      : ""
                      :
                      <Link className="nav-link" to="/login">
                      Sign in, to make an order!
                      </Link>
                    }
                </section>
            }
        </>
    )
}

export default ProductDetail