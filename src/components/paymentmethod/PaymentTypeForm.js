import React, { useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

//Author: Danny Barker
//Purpose: Create a payment method
//Methods: If user has filled out all the correct input fields, on submit, the payment method will be created and stored with the current users id. Uses POST call and then pushed user to payment options page.


const PaymentTypeForm = props => {
  const merchant = useRef()
  const accountNumber = useRef()
  const expireDate = useRef()
  const createDate = useRef()
  const { isAuthenticated } = useSimpleAuth()

  // This does a post call that posts the payment type to the db

  const createPayment = () => {
      const expire = `${expireDate.current.value}-01`
      if (isAuthenticated()) {
          fetch(`http://localhost:8000/paymenttypes`, {
              "method": "POST",
              "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
              },
              "body": JSON.stringify({
                "merchant_name": merchant.current.value,
                "account_number": accountNumber.current.value,
                "expiration_date": expire,
                "create_date": createDate.current.value
            })
          })
              .then(response => response.json())
              .then(() => {
                props.history.push("/payment/options")
              })

      }
  }


  return (
    <>
      <h1>Create a Payment Option</h1>
      <form className="categoryList" onSubmit={(e) => {
        e.preventDefault()
        createPayment()
      }}>
        <fieldset>
          <label htmlFor="merchant">Merchant:</label>
          <input type="text" ref={merchant} name="merchant" required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="account-number">Account Number:</label>
          <input type="text" ref={accountNumber} name="account-number" required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="expire-date">Expiration Date:</label>
          <input type="month" ref={expireDate} name="expire-date" min={new Date().toISOString().slice(0,7)} required></input>
        </fieldset>
        <input type="date" ref={createDate} name="expire-date" defaultValue={new Date().toISOString().slice(0,10)} hidden></input>
        <button type="submit">Add Payment</button>
      </form>
    </>
  )
}

export default PaymentTypeForm