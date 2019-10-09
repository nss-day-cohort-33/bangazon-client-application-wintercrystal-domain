import React from "react"
import { Link } from 'react-router-dom'

//Author: Danny Barker
//Purpose: Show products to user as a card
//Methods: Takes one product object, at a time, and displays it to the DOM.

const Product = props => {

  // This is returning a product card with a terinary statement that is checking the value of showCategory that is being passed down to this component. If showCategory is true than a link to the products category is shown, if it is not than nothing is show for the category.

    return (
        <>

          <div className={`card product-${props.product.id}`} style={{width: "18rem"}}>
            <div className="card-body">
              <section className="product">
                  <Link className="nav-link" to={`/products/${props.product.id}`}>
                      <h5>{props.product.name}</h5>
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
              <p className="card-text">${props.product.price.toFixed(2)}</p>
              <p className="card-text">Quantity: <b>{props.product.quantity}</b> <font size="1">available</font></p>
            </div>
          </div>

        </>
    )
}

export default Product
