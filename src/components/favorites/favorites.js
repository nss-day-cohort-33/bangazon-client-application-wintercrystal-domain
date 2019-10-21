import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import Product from '../ApplicationViews'

const Favorites = props => {

  const [favorites, setFavorite] = useState([]);
  const { isAuthenticated } = useSimpleAuth();


  const getFavorites = () => {
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
    getFavorites()
  }, []);

return (
  <>

          <div className="Favorites">
          <div className="card-body">
          <h1 className="title">Favorites</h1>
          {

              favorites.map((favorite) => {
                  return ("seller" in favorite && favorite.seller !== null) ? <div className="card" key={favorite.id}>
                      <h2 className="first_name"><p>Seller: {favorite.seller.user.first_name} {favorite.seller.user.last_name} </p></h2>
                      {
                        favorite.seller.products.map((product) => {
                          return ( <div key={product.id}>
                            <h2>Products</h2>
                            <li>Name: {product.name}</li>
                            <li>Price:$ {product.price}</li>
                            <li>Description: {product.description}</li>
                            </div>)
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