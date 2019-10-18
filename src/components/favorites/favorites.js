import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const Favorites = props => {

  const [favorites, setFavorite] = useState([]);
  const { isAuthenticated } = useSimpleAuth();



  const getFavorites = () => {
    console.log(props.products)
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
          setFavorite(favorites);
        });
        }
    }

  useEffect(() => {
    getFavorites()
  }, []);

return (
  <>
          <div className="Favorites">
          {
              favorites.map((favorite) => {
                  return ("seller" in favorite && favorite.seller !== null) ? <div>
                      <p className="first_name" ><b>{favorite.seller.user.first_name}</b></p>
                      <p className="last_name" ><b>{favorite.seller.user.last_name}</b></p>
                      <p>{props.products}</p>
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