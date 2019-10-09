import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import PaymentType from "../cards/PaymentType"
import "./PaymentType.css"

//Author: Danny Barker
//Purpose: Show payment options specific tothat user
//Methods: Uses a GET call to get user specific payment types loaded ot DOM, if user has none, then they will be given a link to add some.


const ProductCategories = props => {
    const [paymentTypes, setPaymentTypes] = useState([])
    const { isAuthenticated } = useSimpleAuth()

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

    useEffect(getPaymentTypes, [])

    // This terinary statement checks whether there is atleast one payment type with this user. If there is atleast one then payment options with user payment types are shown. If there is not one, then a link is given for a user to create a payment type.

    return (
        <>
            {
              paymentTypes.length > 0 ?
              <>
                <h1>Payment Options</h1>
                <article className="paymentTypeList">
                    {
                        paymentTypes.map(paymentType=>
                            <PaymentType key={paymentType.id} paymentType={paymentType} getPaymentTypes={getPaymentTypes} />
                        )
                    }
                </article>
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

export default ProductCategories