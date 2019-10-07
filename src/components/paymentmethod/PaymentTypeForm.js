import React, { useRef } from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import Product from "../cards/Product"

const PaymentTypeForm = props => {
  const merchant = useRef()
  const accountNumber = useRef()
  const expireDate = useRef()
  const { isAuthenticated } = useSimpleAuth()
  const getDate = () => {
    const currDate =
    console.log(currDate);
  }

  // const getProducts = () => {
  //     if (isAuthenticated()) {
  //         fetch(`http://localhost:8000/paymenttypes`, {
  //             "method": "POST",
  //             "headers": {
  //                 "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
  //             },
  //             "body": JSON.stringify({
  //               "merchant_name": merchant.current.value,
  //               "account_number": accountNumber.current.value,
  //               "expiration_date": expireDate.current.value,
  //               "create_date": new Date().toISOString().slice(0,10),
  //           })
  //         })
  //             .then(response => response.json())
  //             .then(setProducts)
  //     }
  // }

  // useEffect(getProducts, [])

  return (
    <>
      <form className="categoryList" onSubmit={(e) => {
        e.preventDefault()
        getDate()
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
          <input type="date" ref={expireDate} name="expire-date" required></input>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default PaymentTypeForm


{/* <Link className="nav-link" to={`/productcategories/${props.category.id}`}>
                <h3>{props.category.name}({products.length})</h3>
                </Link> */}