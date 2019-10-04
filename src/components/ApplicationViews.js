import { Route } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import ProductCategories from "./productcategories/ProductCategories"



const ApplicationViews = () => {
    return (
        <React.Fragment>

            {/* <Route
                exact path="/" render={props => {
                    return <ParkExplorer {...props} />
                }}
            /> */}

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
                path="/productcategories" render={props => {
                    return (
                       <ProductCategories/>
                    )
                }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)