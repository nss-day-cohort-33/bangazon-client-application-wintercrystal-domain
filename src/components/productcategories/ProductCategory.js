import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

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
                <h3>{props.category.name}({products.length})</h3>
                {
                    products.slice(0, 3).map(product =>
                        <p>{product.name}</p>
                    )
                }
            </article>
            :
            ""
            }
        </>
    )
}

export default ProductCategory