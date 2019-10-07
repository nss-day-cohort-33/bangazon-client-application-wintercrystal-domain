import React from "react"

const PaymentType = props => {
    const oldDate = props.paymentType.expiration_date.split("-")
    const newDate = `${oldDate[1]}-${oldDate[0]}`

    return (
        <>

          <div className={`card paymentType-${props.paymentType.id}`} style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{props.paymentType.merchant_name}</h5>
              <p className="card-text">Expeiration Date: {newDate}</p>
              <a href="#" className={`btn btn-primary paymentType-delete-${props.paymentType.id}`}>Delete</a>
            </div>
          </div>

        </>
    )
}

export default PaymentType