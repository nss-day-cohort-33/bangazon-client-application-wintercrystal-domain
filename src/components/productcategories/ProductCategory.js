import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import Product from "../cards/Product"
import "./ProductCategory.css"

const ProductCategory = props => {
    const [products, setProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getProducts = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/products?category=${props.category.id}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setProducts)
        }
    }

    useEffect(getProducts, [])

    return (
        <>
            { products.length > 0 ?
              <article className="categoryList">
                <Link className="nav-link" to={`/productcategories/${props.category.id}`}>
                <h3>{props.category.name}({products.length})</h3>
                </Link>
                <div className={`productDiv category-${props.category.id}`}>
                  {
                      products.slice(0, 3).map(product =>
                          <Product key={product.id} product={product} />
                      )
                  }
                </div>
            </article>
            :
            ""
            }
        </>
    )
}

export default ProductCategory