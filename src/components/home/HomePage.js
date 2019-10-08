import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import Product from "../cards/Product"
import "./HomePage.css"



const HomePage = props => {
    const [products, setProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()


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

          products.map(product =>{
              return( <Product key={product.id} product={product} showCategory={true} /> )
          })


          : ""}
          </div>
        </>
    )
}

export default HomePage