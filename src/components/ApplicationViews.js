import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter, Redirect } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import ProductDetail from "./products/ProductDetail"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import ProductCategories from "./productcategories/ProductCategories"
import ProductCategory  from "./productcategories/ProductCategory"
import HomePage from "./home/HomePage"
import PaymentTypeForm from "./paymentmethod/PaymentTypeForm"
import ProductForm from "./products/ProductForm"
import PaymentTypes from "./paymentmethod/PaymentTypes"
import CardOrder from "./cart/CartOrder"
import MyProfile from "./profile/MyProfile"
import OrderHistory from "./profile/OrderHistory"
import OrderDetail from "./profile/OrderDetail"



const ApplicationViews = () => {
    // Fetches all products and categories to be used in product categories and product details pages
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [orders, setOrders] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    // Fetch from database then set state with products
    const getProducts = () => {
            fetch(`http://localhost:8000/products`, {
                "method": "GET",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(setProducts)
    }

    // Fetch from database then set state with categories
    const getCategories = () => {
            fetch(`http://localhost:8000/productcategories`, {
                "method": "GET",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(setCategories)
    }

    // Fetch from database then set state with categories
    const getOrders = () => {
        fetch(`http://localhost:8000/orders`, {
            "method": "GET",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(setOrders)
    }

    // Runs both fetches in sequence when application starts
    useEffect(() => {
        getProducts()
        getCategories()
        getOrders()
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

            {/* Gets the id from the end of the path and finds that specific product from the state we set
                Then passes that product object into the product detail component */}
            <Route exact path="/products/:productId(\d+)" render={(props) => {
                let product = products.find(product => product.id === +props.match.params.productId)
                if (product) {
                    return <ProductDetail {...props} product={product} />
                }
                }}
            />


            <Route
                exact path="/productcategories" render={props => {
                    return (
                       <ProductCategories {...props} categories={categories} />
                    )
                }}
            />
            {/* Redirect unauthenticated user to login page */}
            <Route
                exact path="/profile" render={props => {
                    if(isAuthenticated()) return (
                       <MyProfile  />
                    )
                    else return <Redirect to="/login" />
                }}
            />

            {/* Passes in the fetch statement and categories for use by the product form */}
            <Route
                exact path="/products/new" render={props => {
                    if(isAuthenticated()) return (
                       <ProductForm  {...props} getProducts = {getProducts} categories={categories} />
                    )
                    else return <Redirect to="/login" />
                }}
            />


            {/* Gets the id from the end of the path and finds that specific product category from the state we set
                Then passes that category object into the product category component
                If that specific product category doesn't exist, a 404 object will be passed in */}
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

            {/* If the user is logged in and authenticated they will go to the payment form
                if not they will be forced to login */}
            <Route
                exact path="/payment/create" render={props => {
                    if(isAuthenticated()) return (
                        <PaymentTypeForm {...props} />
                    )
                    else return <Redirect to="/login"/>
                }}
            />

            {/* If the user is logged in and authenticated they will go to the payment page
                if not they will be forced to login */}
            <Route
                exact path="/payment/options" render={props => {
                  if (isAuthenticated()) {
                      return (
                        <PaymentTypes {...props} />
                      )
                    } else {
                      return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                exact path="/cart" render={props => {
                  if (isAuthenticated()) {
                      return (
                        <CardOrder {...props} />
                      )
                    } else {
                      return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                exact path="/orderhistory" render={props => {
                    return (
                        <OrderHistory {...props} />
                    )
                }}
            />

            {/* Gets the id from the end of the path and finds that specific product category from the state we set
                Then passes that category object into the product category component
                If that specific product category doesn't exist, a 404 object will be passed in */}
            <Route exact path="/orderhistory/:orderId(\d+)" render={(props) => {
              let order = orders.find(order => order.id === +props.match.params.orderId)
              if (order) {
                return <OrderDetail {...props} order={order} />
              }
              }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)