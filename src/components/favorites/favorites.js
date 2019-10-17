import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const Favorites = props => {

  const [favorite, setFavorite] = useState([]);
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
          console.log(favorites[0].customer.url.substring(32,33))
          const favorite = favorites.find(favorite => {
            return favorite.id === parseInt(localStorage.getItem("id"))
          });
          setFavorite(favorite);
        });
    }
  };

  useEffect(() => {
    // console.log(getFavorites(favorite))
    getFavorites()
  }, []);
 return (
  <>
  <main className="explorer">
    <div>
         {favorite}
       </div>
        </main>
      </>
  )
 }


export default withRouter(Favorites)