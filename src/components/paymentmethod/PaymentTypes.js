import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import PaymentType from "../cards/PaymentType"
import "./PaymentType.css"

const ProductCategories = props => {
    const [paymentTypes, setPaymentTypes] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getPaymentTypes = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/paymenttypes`, {
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
            <h1>Payment Options</h1>
            <article className="paymentTypeList">
                {
                    paymentTypes.map(paymentType=>
                        <PaymentType key={paymentType.id} paymentType={paymentType} getPaymentTypes={getPaymentTypes} />
                    )
                }
            </article>
        </>
    )
}

export default ProductCategories