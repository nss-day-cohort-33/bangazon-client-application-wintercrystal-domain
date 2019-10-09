import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ProductCart from "../cards/productCart"

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
            console.log(data)
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
        console.log("im on top")
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/orders?customer_id=${localStorage.getItem("id")}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log("im here")
                getOrderProducts(data)})
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
    console.log(orderProducts)
    return (
        <>
        <button onClick={deleteCart}>Delete Order</button>
        <h2>Items in your cart:</h2>
        <section className="cartProducts">
            {/* ternary statement to load the rest of the code after the page has been mounted */}
            {order ?
            orderProducts.map(orderProduct => {
                console.log(orderProduct)
                return (
                    <div key={orderProduct.id}>
                    <ProductCart key={orderProduct.id} quantity={orderProduct.quantity} productId={orderProduct.product_id} />
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
    )

}

export default CartOrder