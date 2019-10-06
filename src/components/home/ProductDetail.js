import React from "react"
import { Link } from 'react-router-dom'

const ProductDetail = props => {
    return (
        <>
            {console.log(props.product)}
            {
                <section className="product-details">
                    <h3>{props.product.name}</h3>
                    <h4>{props.product.price}</h4>
                    <p>{props.product.description}</p>
                </section>
            }
        </>
    )
}

export default ProductDetail