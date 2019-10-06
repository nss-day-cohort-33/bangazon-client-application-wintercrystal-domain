import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import Product from "./Product"


const Home = props => {
    const [products, setProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getProducts = (productsId) => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/products/${productsId}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
            .then(response => response.json())
            .then(setProducts)

        }
    }

    useEffect(() => {
        if (isAuthenticated()) {
            fetch('http://localhost:8000/products', {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setProducts)
        }
    }, [])

    return (
        <>
            <h1>hello</h1>
            <article className="productList">
                {
                    products.map(product =>
                        <Product key={product.id}
                            getProducts={getProducts}
                            product={product}
                            />)
                }
            </article>
        </>
    )
}
export default withRouter(Home)