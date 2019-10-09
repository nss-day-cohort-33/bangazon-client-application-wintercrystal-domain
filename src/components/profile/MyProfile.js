import React from "react"
import { withRouter } from "react-router-dom"

// Author: Dustin Hobson
// Purpose: Render 'My Profile' Page with functioning links to payment options/form for authenticated users
const Profile = props => {


    return (
        <React.Fragment>

            <a href='/payment/options'>
            <h4>Payment Options</h4>
            </a>
            <a href='/payment/create'>
            <h4>Add New Payment Type</h4>
            </a>

        </React.Fragment>
    )
}
export default withRouter(Profile)








