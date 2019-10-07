import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import ProductDetail from "./products/ProductDetail"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import ProductCategories from "./productcategories/ProductCategories"
import ProductCategory  from "./productcategories/ProductCategory"
import HomePage from "./home/HomePage"
import ProductForm from "./products/ProductForm"



const ApplicationViews = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getProducts = () => {
      if (isAuthenticated()) {
            fetch(`http://localhost:8000/products`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setProducts)
        }
    }

    const getCategories = () => {
            if (isAuthenticated()) {
            fetch(`http://localhost:8000/productcategories`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setCategories)
        }
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return <HomePage {...props} />
                }}
            />

            <Route
                exact path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                exact path="/login" render={props => {
                    return <Login {...props} />
                }}
            />

            <Route exact path="/products/:productId(\d+)" render={(props) => {
                let product = products.find(product => product.id === +props.match.params.productId)
                if (product) {
                    return <ProductDetail {...props} product={product} />
                }
                }}
            />

            {/* <Route
                path="/areas" render={props => {
                    return (
                        <>
                            <h1>Areas</h1>
                            <img className="swings" src={require('./home/swings.jpeg')} alt="My Dog" />
                        </>
                    )
                }}
            />

            <Route
                path="/attractions" render={props => {
                    return (
                        <>
                            <h1>Attractions</h1>
                            <img className="swings" src={require('./home/swings.jpeg')} alt="My Dog" />
                        </>
                    )
                }}
            /> */}

            <Route
                exact path="/productcategories" render={props => {
                    return (
                       <ProductCategories categories={categories} />
                    )
                }}
            />
            <Route
                exact path="/products/new" render={props => {
                    return (
                       <ProductForm  {...props} getProducts = {getProducts} categories={categories} />
                    )
                }}
            />

            <Route exact path="/productcategories/:categoryId(\d+)" render={(props) => {
              let category = categories.find(category =>
              category.id === +props.match.params.categoryId
              )
              if (!category) {
                category = {id:404, name:"Category Not Found." }
              }
              return <ProductCategory {...props} category={ category } />
              }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)