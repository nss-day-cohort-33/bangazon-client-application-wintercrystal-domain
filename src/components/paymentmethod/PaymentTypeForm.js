import React, { useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const PaymentTypeForm = props => {
  const merchant = useRef()
  const accountNumber = useRef()
  const expireDate = useRef()
  const createDate = useRef()
  const { isAuthenticated } = useSimpleAuth()

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
      }
  }


  return (
    <>
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
        <input type="date" ref={createDate} name="expire-date" value={new Date().toISOString().slice(0,10)} hidden></input>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default PaymentTypeForm