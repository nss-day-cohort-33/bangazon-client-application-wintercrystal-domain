import React, {useRef, useEffect, useState} from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { request } from "http"
// import {Date} from core-js

const ProductForm = props => {

    const { isAuthenticated } = useSimpleAuth()
    const [categories, setCategories] = useState([])
    const name = useRef()
    const price = useRef()
    const description = useRef()
    const quantity = useRef()
    const product_category= useRef()
    const location = useRef()
    const image = useRef()




    // const addImage = () => {
    //     fetch('http://localhost:8000/images', {
    //         "method": "POST",
    //         "headers": {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
    //         },
    //         "body": JSON.stringify({
    //             "product_pic": request.data["image"],

    //         })
    //     })
    //         .then(response => response.json())
    //         .then(() => {
    //             console.log("Added image")
    //         })
    // }

    const addProduct = () => {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        console.log(`${yyyy}-${mm}-${dd}`)
        fetch('http://localhost:8000/products', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                "name": name.current.value,
                "price": price.current.value,
                "description": description.current.value,
                "quantity": quantity.current.value,
                "created_date": `${yyyy}-${mm}-${dd}`,
                "product_category_id": product_category.current.value,
                "location": location.current.value,
                "image_id":1
                // "image": image.current.value

            })
        })
            .then(response => response.json())
            .then(() => {
                console.log("Added")
                props.history.push("/")
            })
    }



    return (
        <React.Fragment>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                    ref={name}
                    name="starttime"
                    autoFocus
                    required
                    type="text"

                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                    ref={price}
                    name="price"
                    required
                    type="number"

                    />
                </div>
                <div >
                    <label htmlFor="description">Description</label>
                    <input
                    ref={description}
                    name="description"
                    required
                    type="textarea"

                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                    ref={quantity}
                    name="quantity"
                    required
                    type="number"

                    />
                </div>
                <div>
                    <label htmlFor="product_category">Product Category</label>
                    <select
                    ref={product_category}
                    name="product_category"
                    required>
                    {
                        props.categories.map(category =>
                            <option  key={category.id} value={category.id}>{category.name}</option>
                        )
                    }
                    </select>

    </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input
                    ref={location}
                    name="location"
                    required
                    type="text"

                    />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                    ref={image}
                    name="image"
                    required
                    type="file"

                    />
                </div>
                {/* <div>
                    <label htmlFor="pImage">Image</label>
                    <input
                    ref={pImage}
                    name="pImage"
                    required
                    type="number"

                    />
                </div> */}



                    <button onClick={addProduct}
                    >List Product</button>
            </form>
        </React.Fragment>
    )
}


export default ProductForm