import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

//Author: Tyler Carpenter
//Purpose: to get product from database and display it in a card component
//Methods: getProduct by id.

const ProductCart = (props) => {

    const [product, setProduct] = useState([])

    //method to grab specific product from database
    const getProduct = () => {
        fetch(`http://localhost:8000/products/${props.productId}`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                  }
              })
              .then(response => response.json())
              .then(setProduct)
    }

    useEffect(getProduct, [])
    console.log(product)


    return (
        <>
            <div className={`card product-${product.id}`} style={{width: "18rem"}}>
                <div className="card-body">
                <section className="product">
                    <Link className="nav-link" to={`/products/${product.id}`}>
                        <h5>{product.name}</h5>
                    </Link>
                </section>
              <p className="card-text">Quantity: <b>{props.quantity}</b></p>
              <p className="card-text">${(+product.price * +props.quantity).toFixed(2)}</p>
                </div>
            </div>
        </>
    )
}

export default ProductCart