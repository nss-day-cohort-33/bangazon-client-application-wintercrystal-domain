import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


const CartOrder = (props) => {

    const [order, setOrder] = useState([])

    const getCart = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/Orders`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setProducts)
        }
    }


}