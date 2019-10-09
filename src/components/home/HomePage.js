import React, { useEffect, useState } from "react"
import Product from "../cards/Product"
import "./HomePage.css"

//Author: Tyler Carpenter
//Purpose: Home Page will show the 20 most recent items added to sell by users
//Methods: getQuantity by specified number.

const HomePage = props => {
    const [products, setProducts] = useState([])


    const getQuantity = () => {
              fetch(`http://localhost:8000/products?quantity=20`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                  }
              })
              .then(response => response.json())
              .then((response) => {
                  setProducts(response.reverse())
                })

      }

    useEffect(getQuantity, [])

    return(
        <>
          <h1> WELCOME TO BANGAZON</h1>
          <a href='/products/new'>
              <h4>Sell a Product</h4>
              </a>

          <h3>Here are some of the most recent products:</h3>
          <div className="homePage-Div">
          {products.length > 0 ?
          // looping through products and displaying the information in a card component
          products.map(product =>{
              return( <Product key={product.id} product={product} showCategory={true} /> )
          })


          : ""}
          </div>
        </>
    )
}

export default HomePage