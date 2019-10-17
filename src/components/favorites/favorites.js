import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const Favorites = () => {

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
          console.log(favorites)
          setFavorite(favorites);
        });
        }
        // );
    }
  // };

  useEffect(() => {
    // console.log(getFavorites(favorite))
    getFavorites()
  }, []);

return (
  <>
  <div>hi</div>
          <div className="Favorites">
          {
              favorites.map((favorite) => {
                  return ("seller" in favorite && favorite.seller !== null) ? <div>
                      {favorite.seller.user.first_name}
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