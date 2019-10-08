import React from "react"
import { Link } from 'react-router-dom'

const ProductDetail = props => {
    return (
        <>
            {

                <section className="product-details">
                    <h3>{props.product.name}</h3>
                    <h4>{props.product.price}</h4>
                    <p>{props.product.description}</p>
                    <h4>Quantity Available: {props.product.quantity}</h4>
                    <button>Add To Order</button>
                </section>
            }
        </>
    )
}

export default ProductDetail