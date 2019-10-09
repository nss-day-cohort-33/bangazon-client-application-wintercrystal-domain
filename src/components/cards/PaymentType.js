import React from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

//Author: Danny Barker
//Purpose: Shows a users payment types as a card and adds a delete button to delete a users payment type
//Methods: Takes one payment object, at a time, and displays it to the DOM and also add a delete button functionality to delete payment type.


const PaymentType = props => {


    const oldDate = props.paymentType.expiration_date.slice(0,7)
    const { isAuthenticated } = useSimpleAuth()

    // this fetch call deletes a specific payment. It does not take any arguments because there is not more than one payment type that it's dealing with in this component, so we are able to just pass the id within the url.

    const deletePayment = () => {
      if (isAuthenticated()) {
          fetch(`http://localhost:8000/paymenttypes/${props.paymentType.id}`, {
              "method": "DELETE",
              "headers": {
                  "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
              }
          })
              .then(props.getPaymentTypes)

      }
  }
    return (
        <>

          <div className={`card paymentType-${props.paymentType.id}`} style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{props.paymentType.merchant_name}</h5>
              <p className="card-text">Expeiration Date: {oldDate}</p>
              <button onClick={deletePayment} className={`btn btn-primary paymentType-delete-${props.paymentType.id}`}>Delete</button>
            </div>
          </div>

        </>
    )
}

export default PaymentType