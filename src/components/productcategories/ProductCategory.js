import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Product from "../cards/Product"
import "./ProductCategory.css"

//Author: Danny Barker
//Purpose: Shows a product category with a link to its detail page and then lists out, up to 3, products.
//Methods: takes one category at a time and also uses a GET call to get category specific products.


const ProductCategory = props => {
    const [products, setProducts] = useState([])

    // Fetch call that gets all the products within a single category. Uses a query param that passes in a category id to get specific products back and then it changes products array to hold products of that category

    const getProducts = () => {
            fetch(`http://localhost:8000/products?category=${props.category.id}`, {
                "method": "GET",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(setProducts)
    }

    useEffect(getProducts, [])

    // It will return components based off of the terinary statement. Which, is checkout the products array has atleast one product in it. If a category has no products in it, then it will return nothing and not populate the DOM.
    // There is a second terinary state that controls the number of products being rendered to the DOM. If the path is "/productcategories" then up to three products per category will be listed, if the path is not "/productcategories" then all products within a category will be listed.

    return (
        <>
            { products.length > 0 ?
              <article className="categoryList">
                <Link className="nav-link" to={`/productcategories/${props.category.id}`}>
                <h3>{props.category.name}({products.length})</h3>
                </Link>
                { props.showThree ?
                  <div className={`productDiv category-${props.category.id}`}>
                  {
                    products.slice(0, 3).map(product =>
                      <Product key={product.id} product={product} showCategory={false} />
                      )
                  }
                </div>
                :
                <div className={`productDiv category-${props.category.id}`}>
                  {
                      products.map(product =>
                          <Product key={product.id} product={product} showCategory={false} />
                      )
                  }
                </div>
                }
            </article>
            :
            ""
            }
        </>
    )
}

export default ProductCategory