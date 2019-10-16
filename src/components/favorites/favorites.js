import React, { useEffect, useState } from "react";
// import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import { Link } from "react-router-dom";

const Favorites = props => {

  const [favorite, setFavorite] = useState({user:{}});
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
          const favorite = favorites.find(favorite => {
            return favorite.id === parseInt(localStorage.getItem("id"))
          });
          setFavorite(favorite);
        });
    }
  };

  useEffect(() => {

    getFavorites()
  }, []);
 return (
  <>
  <main className="explorer">
    <div>
         {favorite.customer.user.first_name}
       </div>
        </main>
      </>
  )
 }


export default Favorites