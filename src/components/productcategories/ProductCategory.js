import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import Product from "../cards/Product"
import "./ProductCategory.css"

//Author: Danny Barker
//Purpose: Shows a product category with a link to its detail page and then lists out, up to 3, products.
//Methods: takes one category at a time and also uses a GET call to get category specific products.


const ProductCategory = props => {
    const [products, setProducts] = useState([])

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

    return (
        <>
            { products.length > 0 ?
              <article className="categoryList">
                <Link className="nav-link" to={`/productcategories/${props.category.id}`}>
                <h3>{props.category.name}({products.length})</h3>
                </Link>
                { window.location.pathname === "/productcategories" ?
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