import React from "react"
import { Link } from 'react-router-dom'

const Product = props => {

    return (
        <>
            {console.log(props.product)}
            <section className="product">
                <Link className="nav-link" to={`/products/${props.product.id}`}>
                    <h3>{props.product.name}</h3>
                </Link>
            </section>
        </>
    )
}

export default Product