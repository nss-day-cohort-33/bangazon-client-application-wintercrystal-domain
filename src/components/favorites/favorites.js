import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import Product from '../ApplicationViews'

const Favorites = props => {

  const [favorites, setFavorite] = useState([]);
  const [favoriteProduct, setFavoriteProduct] = useState([])
  // const [myProducts, setMyProducts] = useState([])

  const { isAuthenticated } = useSimpleAuth();

  const getFavoriteProducts = () => {
    fetch(`http://localhost:8000/products?product_customer=${props.customer}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(setFavoriteProduct)
}

  const getFavorites = () => {
    console.log(favoriteProduct)
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/favorites`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`
        }
      })
        .then(response => response.json())
        .then(favorites => {
          setFavorite(favorites)
        })
        }
    }

  useEffect(() => {
    getFavoriteProducts()
    // console.log(product)
    getFavorites()
    // getMyProducts()
    // getProduct()
  }, []);

return (
  <>

          <div className="Favorites">
          <h1>Favorites</h1>
          {

              favorites.map((favorite) => {
                console.log(favorite)
                  return ("seller" in favorite && favorite.seller !== null) ? <div>
                      <p className="first_name" ><b>{favorite.seller.user.first_name}</b></p>
                      <p>My Products{favoriteProduct ? `(${favoriteProduct.length})` : ""}</p>

                      {
                        favoriteProduct.map((product) => {
                          return product.name
                        })
                      }
                  </div>

                  :
                  ""
              })
          }
          </div>
  </>
)
}


export default withRouter(Favorites)