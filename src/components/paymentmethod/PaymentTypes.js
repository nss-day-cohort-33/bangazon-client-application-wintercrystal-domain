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