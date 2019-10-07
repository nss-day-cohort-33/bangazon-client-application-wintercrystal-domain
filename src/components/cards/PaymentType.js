import React from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const PaymentType = props => {
    const oldDate = props.paymentType.expiration_date.split("-")
    const newDate = `${oldDate[1]}-${oldDate[0]}`
    const { isAuthenticated } = useSimpleAuth()

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
              <p className="card-text">Expeiration Date: {newDate}</p>
              <button onClick={deletePayment} className={`btn btn-primary paymentType-delete-${props.paymentType.id}`}>Delete</button>
            </div>
          </div>

        </>
    )
}

export default PaymentType