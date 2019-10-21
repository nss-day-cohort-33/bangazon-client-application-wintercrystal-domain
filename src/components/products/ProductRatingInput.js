import React, { useRef, useEffect, useState} from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"



const ProductRatingInput = props => {
    const rating = useRef()
    const [myRatings, setMyRatings] = useState([])
    const [isRated, setIsRated] = useState(true)
    const [pRating, setPRating] = useState("")

    const getMyRatings = () => {
        fetch(`http://localhost:8000/ratings?customer=true`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                  }
              })
              .then(response => response.json())
              .then(data => {
                  setMyRatings(data)
                  checkRatings(data)
                  printRating(data)


              })
    }
    const addProductRating = (event) => {
        event.preventDefault()
        fetch('http://localhost:8000/ratings', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                "product_id": event.target.id,
                "score": rating.current.value

            })
        })
        .then(response => response.json())
        .then(props.getMyRatings)
        .then(getMyRatings)
        .then(props.getProducts)


    }

    useEffect(() => {
        props.getMyRatings()
        getMyRatings()
    }, [])

    //function to check if there is already a rating for the product by the authenticated user
    const checkRatings = (arry) => {
        [...new Set(arry.map(x => x.product.id))].forEach(ratingProductId => {

            if(+ratingProductId === +props.productId) {
            setIsRated(false)
        }

    } )
}

    const printRating = (arry) => {
        arry.forEach(rating => {
            console.log("rating Product Id", rating.product.id)

            if (+rating.product.id === +props.productId) {

                console.log("score for product", rating.score)
                 setPRating(rating.score)
            }

        })
    }
    return (
        <React.Fragment >
        {isRated?
            <form>
                <div>
                        <select
                        name="product-rating"
                        ref={rating}
                        required>
                        <option  value = "0"> -- Rate This Product-- </option>
                        <option  value = "1"> 1 </option>
                        <option  value = "2"> 2 </option>
                        <option  value = "3"> 3 </option>
                        <option  value = "4"> 4 </option>
                        <option  value = "5"> 5 </option>
                        </select>
                    <button id={props.productId}
                    onClick = {addProductRating}>Submit Rating</button>
                    </div>
                    <hr/>
            </form>
                      :
                      <div>

                      <p>You have already rated this product a {pRating} out of 5</p>
                      <hr/>
                      </div>
                       }

        </React.Fragment>


    )
}

export default ProductRatingInput