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
import MyProducts from "./products/MyProducts"
import MyProfileEditForm from "./profile/MyProfileEditForm"
import Favorites from "./favorites/favorites"
import CompleteOrder from "./cart/CompleteOrder"
import IncompleteOrders from "./reports/IncompleteOrders"
import Reports from "./reports/Reports"



const ApplicationViews = () => {
    // Fetches all products and categories to be used in product categories and product details pages
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [orders, setOrders] = useState([])
    const [completeOrders, setCompleteOrders] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    const [myRatings, setMyRatings] = useState([])
    const [recommendations, setRecommendations] = useState([])


    // Fetch from database then set state with products
    const getProducts = () => {
            fetch(`http://localhost:8000/products`, {
                "method": "GET",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
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
                  "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
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
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(response => response.json())
            .then(setOrders)
    }
    //function to get an authenticated user's ratings
    const getMyRatings = () => {
        fetch(`http://localhost:8000/ratings?customer=true`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                  }
              })
              .then(response => response.json())
              .then(setMyRatings)
    }
    // First we get the open orders and then call getOrderProducts
    const getCompleteOrders = () => {
        console.log("HENLOOOO")
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/orders?customer_id=${localStorage.getItem("id")}&complete=1`, {
                "method": "GET",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
            .then(response => response.json())
            .then(setCompleteOrders)
        }
    }

    const getRecommendations = () => {
      fetch(`http://localhost:8000/recommendations?user=true`, {
          "method": "GET",
          "headers": {
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then(setRecommendations)
}

    // Runs both fetches in sequence when application starts
    useEffect(() => {
        getProducts()
        getCategories()
        getOrders()
        getCompleteOrders()
        getRecommendations()
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
                if (isAuthenticated()) {
                let product = products.find(product => product.id === +props.match.params.productId)

                if (product) {
                    return <ProductDetail getProducts={getProducts} {...props} product={product} getRecommendations={getRecommendations} />
                }
                else {
                    product = {id:404, name:"Product Not Found." }
                    }
                }
                else return <Redirect to="/login" />
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
                       <MyProfile recommendations={recommendations} />
                    )
                    else return <Redirect to="/login" />
                }}
            />

            <Route
                exact path="/myProducts" render={props => {
                    if(isAuthenticated()) return (
                       <MyProducts {...props}  />
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
                exact path="/cart/addPayment" render={props => {
                    if(isAuthenticated()) return (
                       <CompleteOrder {...props} getCompleteOrders={ getCompleteOrders} getProducts={getProducts} />
                    )
                    else return <Redirect to="/login" />
                }}
            />

            <Route
                exact path="/profile/update" render={props => {
                    if(isAuthenticated()) return (
                        <MyProfileEditForm {...props} />
                    )
                    else return <Redirect to="/login"/>
                }}
            />
            <Route
                exact path="/favorites" render={props => {
                    if(isAuthenticated()) return (
                        <Favorites {...props} getProducts={getProducts}/>
                    )
                    else return <Redirect to="/login"/>
                }}
            />

            <Route
                exact path="/orderhistory" render={props => {
                    return (
                        <OrderHistory getProducts = {getProducts} {...props} completeOrders={completeOrders}/>
                    )
                }}
            />

            <Route
                exact path="/reports" render={props => {
                    return (
                        <Reports {...props} />
                    )
                }}
            />

            <Route
                exact path="/incomplete-orders" render={props => {
                    return (
                        <IncompleteOrders {...props} />
                    )
                }}
            />

            {/* Gets the id from the end of the path and finds that specific product category from the state we set
                Then passes that category object into the product category component
                If that specific product category doesn't exist, a 404 object will be passed in */}
            <Route exact path="/orderhistory/:orderId(\d+)" render={(props) => {
              let order = completeOrders.find(order => order.id === +props.match.params.orderId)
              if (order) {
                return <OrderDetail getProducts={getProducts} getMyRatings={getMyRatings} {...props} order={order} />
              }
              }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)