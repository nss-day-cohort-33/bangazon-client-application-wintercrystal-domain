import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import Product from '../ApplicationViews'

const Favorites = props => {

  const [favorites, setFavorite] = useState([]);
  const [favoriteProduct, setFavoriteProduct] = useState([])
  // const [myProducts, setMyProducts] = useState([])

  const { isAuthenticated } = useSimpleAuth();

  // const getFavoriteProducts = () => {
  //   if (isAuthenticated()) {
  //   fetch(`http://localhost:8000/favorites`, {
  //       "method": "GET",
  //       "headers": {
  //         "Accept": "application/json",
  //         "Content-Type": "application/json",
  //       }
  //   })
  //       .then(response => response.json())
  //       .then(favoriteProduct => {
  //         console.log(favoriteProduct)
  //         setFavoriteProduct(favoriteProduct)
  //       })
  //   }
  // }

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
    // console.log(product)
    getFavorites()
    // getMyProducts()
    // getProduct()
  }, []);

return (
  <>

          <div className="Favorites">
          <div className="card-body">
          <h1>Favorites</h1>
          {

              favorites.map((favorite) => {
                console.log(favorite)
                  return ("seller" in favorite && favorite.seller !== null) ? <div className="card">
                    <div className = "col">
                      <p className="first_name" ><h2>Seller: {favorite.seller.user.first_name}</h2></p>
                      </div>
                      {
                        favorite.seller.products.map((product) => {
                          return <li>{product.name}</li>
                        })
                      }
                  </div>

                  :
                  ""
              })
          }
          </div>
          </div>
  </>
)
}


export default withRouter(Favorites)