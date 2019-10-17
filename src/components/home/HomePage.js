import React, { useEffect, useState, useRef } from "react"
import Product from "../cards/Product"
import "./HomePage.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

//Author: Tyler Carpenter
//Purpose: Home Page will show the 20 most recent items added to sell by users
//Methods: getQuantity by specified number.

//Author: Dustin Hobson
//Purpose: Search functionality of products by city
//Methods: Get products by location query

const HomePage = props => {
    const [products, setProducts] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    const searchTerm = useRef()
    const [city, setCity] = useState(undefined)





    const getQuantity = (event) => {
            if (event) {
              event.preventDefault()
            }
              fetch(`http://localhost:8000/products?quantity=20`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",


                  }
              })
              .then(response => response.json())
              .then((response) => {
                  setProducts(response)
                  setCity(undefined)
                })

      }

    const searchProducts = event => {
      event.preventDefault()
      let query = searchTerm.current.value
      fetch(`http://localhost:8000/products?location=${query}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })
      .then(response => response.json())
      .then((response) => {
        setCity(query)
        setProducts(response)
      })
      .then(dynamicHeader())
    }
    // Function to decide which header to display based on if user has searched for products, is viewing home page 20 products, or has entered a non-searchable city or city with no results
    const dynamicHeader = (city) => {
      // City in initial state of undefined or search is cleared
      if (city === undefined) {
        return <h3>Here are some of the most recent products:</h3>
      }
      // City entered is empty String
      else if (city === ""){
        return <h3>Please enter a searchable city</h3>
      }
      // City entered is something(search term) but there are no products brought back from server
      else if (city !== undefined & products.length === 0) {
        return <h3>There are no products currently for sale in {city}.</h3>
      }
      // City is something and there are products for that city
      else return (<h3>Products located in {city}:</h3>)
    }

    useEffect(getQuantity, [])

      return(
        <>
          <h1> WELCOME TO BANGAZON</h1>

          {isAuthenticated() ?

          <a href='/products/new'>
              <h4>Sell a Product</h4>
              </a> : ""}

          <form>
            <input
                placeholder="Search by city..."
                name="search"
                ref={searchTerm}
            />
            <button
            id="search"
            onClick = {(event) => {
              searchProducts(event)
            }}>Search</button>
            <button
            id="clear"
            onClick = {(event) => {
              getQuantity(event)

              }}
            >Clear</button>
          </form>


          {dynamicHeader(city)}
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