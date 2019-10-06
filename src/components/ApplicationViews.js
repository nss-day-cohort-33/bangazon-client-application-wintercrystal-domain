import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Home from "./home/Home"
import ProductDetail from "./home/ProductDetail"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"



const ApplicationViews = () => {
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

    useEffect(getProducts, [])

    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return <Home {...props} />
                }}
            />

            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
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
            />

            <Route
                path="/myitinerary" render={props => {
                    return (
                       <MyItinerary/>
                    )
                }}
            /> */}

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)