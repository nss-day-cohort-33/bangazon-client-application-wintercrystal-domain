import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const ProductCart = (props) => {

    const [product, setProduct] = useState([])

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
                {
                props.showCategory ?
                <>
                <p>Category: <Link className="nav-link" to={`/productcategories/${props.product.product_category.url.slice(-1)}`}>
                      {props.product.product_category.name}
                  </Link></p>
                  </>
                  :
                  ""
              }
              <p className="card-text">Quantity: <b>{props.quantity}</b></p>
              <p className="card-text">${(+product.price * +props.quantity)}</p>
                </div>
            </div>
        </>
    )
}

export default ProductCart