import React from "react"
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


const ProductDetail = props => {

  const { isAuthenticated } = useSimpleAuth()

    return (
        <>
            {

                <section className="product-details">
                    <h3>{props.product.name}</h3>
                    <h4>{props.product.price.toFixed(2)}</h4>
                    <p>{props.product.description}</p>
                    <h4>Quantity Available: {props.product.quantity}</h4>
                    {
                      isAuthenticated() ?
                      <button>Add To Order</button>
                      :
                      ""
                    }
                </section>
            }
        </>
    )
}

export default ProductDetail