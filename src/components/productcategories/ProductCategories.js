import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const ProductCategories = props => {
    const [categories, setCategories] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getCategories = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/productcategories`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setCategories)
        }
    }

    useEffect(getCategories, [])

    return (
        <>
            <article className="categoryList">
                {
                    categories.map(category =>
                        <h3>{category.name}</h3>
                    )
                }
            </article>
        </>
    )
}

export default ProductCategories