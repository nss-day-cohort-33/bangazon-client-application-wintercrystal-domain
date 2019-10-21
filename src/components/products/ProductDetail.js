import React, { useEffect, useState, useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Link } from 'react-router-dom'
import "./ProductDetail.css"



//Author: Daniel Krusch
//Purpose: Shows a the details of the product the clicked on the home or product categories page
//Methods: Will create an order or order product based on if an order exists or not for that user
const ProductDetail = props => {
    // Order Product will contain an order product relation row if it exists
    const [orderProduct, setOrderProduct] = useState([])
    const [productQuantity, setProductQuantity] = useState(props.product.quantity)
    const { isAuthenticated } = useSimpleAuth()
    const [count_cart, setCount_Cart] = useState(0)
    let dialog = document.querySelector("#dialog--time")
    const [isOpen, setIsOpen] = useState(false)
    const quantity = useRef()

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
    const getOrderProducts = () => {
                fetch(`http://localhost:8000/orderproducts?product_id=${props.product.id}`, {
                    "method": "GET",
                    "headers": {
                        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                  setOrderProduct(data)
                  setCount_Cart(data.length)
                })
    }

    const handler = e => {
    // Close all dialogs when ESC is pressed
    if (e.keyCode === 27) {
        if (isOpen) {
            toggleDialog()
        }
        }
}


    // On mount get some orders
    useEffect( getOrderProducts, [])


    const addToFavorites = () => {
        // console.log(props.product.customer.url.substring(32,33))
        fetch('http://localhost:8000/favorites', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                // "seller_id": props.product.customer.url.substring(32,33)
                "seller_id": props.product.customer.user.id,
                "products":props.product
            })
        })
            .then(response => response.json())
            .then(() => {
                console.log("Added")
                props.getProducts()
                props.history.push("/favorites")
            })
    }

    // Will post orders and order products on click of the add to order button
    const addOrder = () => {
        // Checks that user is valid
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/orderproducts`, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                },
                body: JSON.stringify({
                    product: props.product.id,
                    quantity: 1
                })

            })
            .then(response => response.json())
            .then(getOrderProducts)
        }
    }

    //Conditionally renders update product button if product belongs to user and has inventory of 0
    const renderUpdateBtn = () => {
        if ((+props.product.customer.id === +localStorage.getItem("id")) && (productQuantity === 0)) {
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
            setProductQuantity(quantity.current.value)
            dialog.removeAttribute("open")
            props.getProducts()
            })



    }
    else {
        e.preventDefault()
        window.alert("Please add a quantity that is greater than 0")
    }
    }
    console.log(props.product.customer)
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
                    <div className = "col">
                    <div className = "row">
                    <h4><font size="1">Posted By: {props.product.customer.user.first_name} {props.product.customer.user.last_name}</font></h4>
                    <button onClick= {addToFavorites}>Add To Favorites</button>
                    </div>
                    </div>
                    <h5>${props.product.price.toFixed(2)} <font size="1">(per one)</font></h5>
                    <p>{props.product.description}</p>
                    <div id="product-quantity">
                    <h4>Quantity: {productQuantity}<font size="1"> available</font></h4>
                    {renderUpdateBtn()}
                    </div>
                    {
                      isAuthenticated() ?
                      (count_cart < props.product.quantity) && (+props.product.customer.id !== +localStorage.getItem("id")) ?
                      <button onClick={() => {
                        if (count_cart < props.product.quantity) {
                          addOrder()
                          setCount_Cart(count_cart+1)
                        }
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