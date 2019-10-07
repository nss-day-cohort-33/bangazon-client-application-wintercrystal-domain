import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import Product from "../cards/Product"



const HomePage = props => {
    const [products, setProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()


    const getQuantity = () => {
        if (isAuthenticated()) {
              fetch(`http://localhost:8000/products?quantity=20`, {
                  "method": "GET",
                  "headers": {
                      "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                  }
              })
                  .then(response => response.json())
                  .then(setProducts)
          }
      }

    useEffect(getQuantity, [])

    return(
        <>
        <h1> WELCOME TO BANGAZON</h1>

        <h3>here are the 20 most recent items</h3>
        {products.length > 0 ?

        products.map(product =>{
            return( <Product key={product.id} product={product} /> )
        })


    : ""}
        </>
    )
}

export default HomePage