import React, {useRef} from "react"
// import {Date} from core-js

// Author: Dustin Hobson
// Purpose: Render New Product Form and Functionality to add new product to DB
// Methods: GET, POST
const ProductForm = props => {

    const name = useRef()
    const price = useRef()
    const description = useRef()
    const quantity = useRef()
    const product_category_value = useRef()
    const location = useRef()




// Function to add new product to DB
    const addProduct = (event) => {
        var format = /[!@#$%^&*()]+/;
        event.preventDefault()
        console.log(price.current.value)
        // convery price string to number and force $00.00 format
        const money = Number(price.current.value).toFixed(2)
        // check on if user has selected a product category
        if ((name.current.value).match(format) || (description.current.value).match(format)) {
            window.alert("Please enter product name/details with no special characters; ie. no '!@#$%^&*()'")
        }
        else if (product_category_value.current.value === "0") {
            window.alert("Please select a Product Category")
        }
        // check on if quantiy of product is a whole number
        else if(quantity.current.value <  1 || quantity.current.value % 1 !== 0) {
            window.alert("Please enter a valid quantity")
        }
        // check on if price is $10,000 or less
        else if ( money < .01 || money > 10000) {
            window.alert("Product price must be greater than $0 and cannot exceed $10,000")
        }
        else {

        fetch('http://localhost:8000/products', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                "name": name.current.value,
                "price": money,
                "description": description.current.value,
                "quantity": quantity.current.value,
                "created_date": new Date().toISOString().slice(0,10),
                "product_category_id": product_category_value.current.value,
                "location": location.current.value,
                "image":""
                // "image": image.current.value

            })
        })
        .then(response => response.json())
        .then(() => {
            console.log("Added")
            props.getProducts()
            props.history.push("/")
        })
    }
    }

    return (
        <React.Fragment>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                    ref={name}
                    name="name"
                    autoFocus
                    required
                    type="text"

                    />
                </div>
                <div>
                    <label htmlFor="price">Price: $</label>
                    <input
                    ref={price}
                    min = "0"
                    name="price"
                    required
                    type="number"
                    step="0.01"
                    pattern="^\d+(?:\.\d{1,2})?$"



                    />
                </div>
                <div >
                    <label htmlFor="description">Description:</label>
                    <textarea
                    ref={description}
                    name="description"
                    required>

                    </textarea>
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                    ref={quantity}
                    name="quantity"
                    min = "0"
                    required
                    type="number"

                    />
                </div>
                <div>
                    <label htmlFor="product_category">Product Category:</label>
                    <select
                    name="product_category"
                    ref={product_category_value}
                    required>
                    <option defaultValue value = "0"> -- select an option -- </option>
                    {
                        props.categories.map(category =>
                            <option  key={category.id} value={category.id}>{category.name}</option>
                        )
                    }
                    </select>

                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                    ref={location}
                    name="location"
                    required
                    type="text"

                    />
                </div>
                    <button onClick={addProduct}
                    >List Product</button>
            </form>
        </React.Fragment>
    )
}


export default ProductForm