import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

// Author: Dustin Hobson/ Mary West
// Purpose: Render 'My Profile' Page with functioning links to payment options/form for authenticated users
// Showing profile information/ edit profile information


const Profile = props => {

    const [getProfile, setProfile] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getCustomers = () => {
        if (isAuthenticated()) {
        fetch(`http://localhost:8000/customers`, {
            "method": "GET",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(response => response.json())
            .then(setProfile)
    }
}


    useEffect(getCustomers, [])

    return (
        <React.Fragment>
        <>
        <main className="explorer">
            {getProfile.map(profile => {
                if (profile.id == localStorage.getItem("id")) {
                return (
                    <div>
                    <ul>
                        <p>{profile.user.first_name}</p>
                        <p>{profile.user.last_name}</p>
                        <p>{profile.user.email}</p>
                        <p>{profile.user.phone_number}</p>
                        <p>{profile.address}</p>
                    </ul>
                    <button className= "btn btn-info">Edit</button>
                    <a href='/payment/options'>
                        <h4>Payment Options</h4>
                        </a>
                        <a href='/payment/create'>
                        <h4>Add New Payment Type</h4>
                        </a>
                    </div>
                    );
                }
            })}
        </main>
        </>
        </React.Fragment>
    );
};

export default withRouter(Profile)






{/* <React.Fragment>
<div className="profile">
{customerProfile.map(profile => {
    console.log("profile", profile)
    if (profile.user_id == localStorage.getItem("user_id")) {
    return (
        <div>
        <ul>
            <li>{profile.user.first_name}</li>
            <li>{profile.user.last_name}</li>
            <li>{profile.user.email}</li>
            <li>{profile.user.phone_number}</li>
            <li>{profile.address}</li>
        </ul>

<a href='/payment/options'>
<h4>Payment Options</h4>
</a>
<a href='/payment/create'>
<h4>Add New Payment Type</h4>
</a>
</div>
    }

</React.Fragment>
)
} */}










