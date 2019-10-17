import React, { useEffect, useState, useRef } from "react"
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

//Author: Danny Barker
//Purpose: Show payment options specific tothat user
//Methods: Uses a GET call to get user specific payment types loaded ot DOM, if user has none, then they will be given a link to add some.


const CompleteOrder = props => {
    const [paymentTypes, setPaymentTypes] = useState([])
    const [order, setOrder] = useState([])
    const [orderProducts, setOrderProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    const payment = useRef()

    // this fetch call gets all the payment types that are specific to this user. It takes a query param of customer id, which we have saved in local storage. That's why it isn't being passed in as an argument

    const getPaymentTypes = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/paymenttypes?customer=${localStorage.getItem("id")}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setPaymentTypes)
        }
    }

    const getOrder = () => {
      if (isAuthenticated()) {
          fetch(`http://localhost:8000/orders?customer_id=${localStorage.getItem("id")}&complete=0`, {
              "method": "GET",
              "headers": {
                  "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
              }
          })
          .then(response => response.json())
          .then(setOrder)
      }
  }

  const addPaymentType = () => {
    if (isAuthenticated()) {
        fetch(`http://localhost:8000/orders/${order[0].id}`, {
            "method": "PUT",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
              "payment_type": +payment.current.value
          })
        })
        .then(() => props.getCompleteOrders())
        .then(() => {
          props.history.push("/orderhistory")
        })
      }
    }


    useEffect(() => {
      getPaymentTypes()
      getOrder()
    }, [])

    // This terinary statement checks whether there is atleast one payment type with this user. If there is atleast one then payment options with user payment types are shown. If there is not one, then a link is given for a user to create a payment type.

    return (
        <>
            {
              paymentTypes.length > 0 ?
              <>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  addPaymentType()
                }}>
                <h4>Please add a payment type.</h4>
                <select className="paymentTypeSelect" ref={payment}>
                    {
                        paymentTypes.map(paymentType=>
                            <option key={paymentType.id} value={`${paymentType.id}`}>{`${paymentType.merchant_name}: ${paymentType.expiration_date.slice(0,7).split("-").reverse().join("/")}`}</option>
                        )
                    }
                </select>
                <button type="submit">Add Payment Type</button>
                </form>
              </>
              :
              <>
                <Link className="nav-link" to="/payment/create">
                  <h6>Add some Payment Options!</h6>
                </Link>
              </>
            }
        </>
    )
}

export default CompleteOrder