import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ProductCategory from "./ProductCategory"

//Author: Danny Barker
//Purpose: Shows product categories and their first three products if they have atleast one product in them.
//Methods: Maps through the categories array and then renders productcategory.


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