import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ProductCart from "../cards/productCart"



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
        {orderProducts.length > 0 ?
        <>
          <button onClick={deleteCart}>Delete Order</button>
          <h2>Items in your cart:</h2>
        <section className="cartProducts">
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
          :
          <h1>No items in cart!</h1>
          }


        </>
    )

}

export default CartOrder