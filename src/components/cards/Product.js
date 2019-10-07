import React from "react"

const Product = props => {

    return (
        <>

          <div className={`card product-${props.product.id}`} style={{width: "18rem"}}>
            <img className="card-img-top" src={props.product.image.product_pic} alt={`${props.product.name}`}/>
            <div className="card-body">
              <h5 className="card-title">{props.product.name}</h5>
              <p className="card-text">${props.product.price}</p>
              <p className="card-text">Quantity: <b>{props.product.quantity}</b> available</p>
              <a href="#" className={`btn btn-primary product-details-${props.product.id}`}>Product Details</a>
            </div>
          </div>

        </>
    )
}

export default Product
