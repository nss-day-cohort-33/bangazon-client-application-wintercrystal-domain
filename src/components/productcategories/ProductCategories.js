import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ProductCategory from "./ProductCategory"

const ProductCategories = props => {

    return (
        <>
            <article className="categoryList">
                {
                    props.categories.map(category =>
                        <ProductCategory key={category.id} category={category} />
                    )
                }
            </article>
        </>
    )
}

export default ProductCategories