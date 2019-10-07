import React from "react"
import { Link } from 'react-router-dom'

const Product = props => {

    return (
        <>

          <div className={`card product-${props.product.id}`} style={{width: "18rem"}}>
            <img className="card-img-top" src={props.product.image} alt={`${props.product.name}`}/>
            <div className="card-body">
              <section className="product">
                  <Link className="nav-link" to={`/products/${props.product.id}`}>
                      <h5>{props.product.name}</h5>
                  </Link>
              </section>
              <p className="card-text">${props.product.price}</p>
              <p className="card-text">Quantity: <b>{props.product.quantity}</b> available</p>
            </div>
          </div>

        </>
    )
}

export default Product
