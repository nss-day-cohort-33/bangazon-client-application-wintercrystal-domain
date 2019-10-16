import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ProductCart from "../cards/productCart"
import { CLIENT_RENEG_LIMIT } from "tls"

//Author: Tyler Carpenter
//Purpose: to show the user their items that they have selected to buy.
//Methods: getOrder and getOrderProduct is Daniel K.'s code. the delete methods are created by me.

const CartOrder = (props) => {

    const [order, setOrder] = useState([])
    const [orderProducts, setOrderProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getOrderProducts = (data) => {
        if (data.length !== 0)
        {
            setOrder(data[0])
            fetch(`http://localhost:8000/orderproducts?order_id=${data[0].id}`, {
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
            fetch(`http://localhost:8000/orders?customer_id=${localStorage.getItem("id")}&complete=1`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
            .then(response => response.json())
            .then(getOrderProducts)
        }
    }

    //method to delete order
    const deleteOrder = () => {
        if(isAuthenticated()){
            fetch(`http://localhost:8000/orders/${order.id}`,{
                "method": "DELETE",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
        }
    }

    //method to delete OrderProduct
    const deleteOrderProduct = (id) => {
        if(isAuthenticated()){
            fetch(`http://localhost:8000/orderproducts/${id}`,{
                "method": "DELETE",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
        }

    }

    //this method will delete order and loop through every orderProduct and delete them
    const deleteCart = () => {
        deleteOrder()
        orderProducts.forEach(orderProduct => {
            deleteOrderProduct(orderProduct.id)
        })
        props.history.push("/")
    }

    useEffect(getOrders, [])
    return (
        <>
        {orderProducts.length > 0 ?
        <>
          <h2>Items in your cart:</h2>
          <div className="orderBtn-Div">
            <button onClick={() => {
              props.history.push("/cart/addPayment")
            }}>
            Complete Order
            </button>
            <button onClick={deleteCart}
            >
            Delete Order
            </button>
          </div>
        <section className="cartProducts">
            {/* ternary statement to load the rest of the code after the page has been mounted */}
            {order ?
            orderProducts.map(orderProduct => {
                console.log(orderProduct)
                return (
                    <div key={orderProduct.id}>
                    <ProductCart key={orderProduct.id} productId={orderProduct.product.id} orderProducts={orderProducts} />
                    <button onClick={() => {
                        deleteOrderProduct(orderProduct.id)
                        getOrders()
                        }} >delete</button>
                    </div>
                    )
            })
         :
         ""
        }
        </section>
        </>
          :
          <>
          <h1>No items in cart!</h1>
          <Link className="nav-link" to="/productcategories">
            Add Products
          </Link>
          </>
          }


        </>
    )

}

export default CartOrder