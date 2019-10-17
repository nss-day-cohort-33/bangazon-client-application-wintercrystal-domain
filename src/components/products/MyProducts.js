import React, { useEffect, useState } from "react"
import Product from "../cards/Product"
import "./MyProducts.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

//Author: Tyler Carpenter
//Purpose: Home Page will show the 20 most recent items added to sell by users
//Methods: getQuantity by specified number.

const MyProducts = props => {
    const [myProducts, setMyProducts] = useState([])
    const {isAuthenticated} = useSimpleAuth()


    const getMyProducts = () => {
              fetch(`http://localhost:8000/products?customer=true`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                  }
              })
              .then(response => response.json())
              .then(setMyProducts)


      }
    useEffect(getMyProducts, [])
    return(
        <>
          <h1>My Products{myProducts ? `(${myProducts.length})` : ""}</h1>

          {isAuthenticated() ?

          <a href='/products/new'>
              <h4>Sell a Product</h4>
              </a> : ""}
          <div className="myProducts-Div">
          {myProducts.length > 0 ?
          // looping through products and displaying the information in a card component
          myProducts.map(product =>{
              return( <Product key={product.id} product={product} showCategory={true} showCategory={true} showSold={true} getMyProducts={getMyProducts} /> )
          })


          : <p>You have no products. Create a product<a href='/products/new'> here</a>.</p>}
          </div>
        </>
    )
}

export default MyProducts