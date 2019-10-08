import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

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








