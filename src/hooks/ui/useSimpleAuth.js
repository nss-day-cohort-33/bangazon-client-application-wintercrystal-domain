import { useState } from "react"

// Authenticates users at login and register and logout. On login, sets token and user id to local storage. On logout local storage is cleared and loggedIn is set to false.

const useSimpleAuth = () => {

    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn || localStorage.getItem("bangazon_token") !== null

    const register = userInfo => {
        return fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(res => {
                if ("token" in res) {
                    localStorage.setItem( "id", res.id )
                    localStorage.setItem( "bangazon_token", res.token )
                    setIsLoggedIn(true)
                }
            })
    }

    const login = credentials => {
        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem( "id", res.id )
                    localStorage.setItem( "bangazon_token", res.token )
                    setIsLoggedIn(true)
                }
            })
    }

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("bangazon_token")
        localStorage.removeItem("id")
    }

    return { isAuthenticated, logout, login, register }
}

export default useSimpleAuth
