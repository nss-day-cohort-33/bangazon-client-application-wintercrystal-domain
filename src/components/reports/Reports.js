import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Link } from "react-router-dom";

// Author: Dustin Hobson/ Mary West
// Purpose: Render 'My Profile' Page with functioning links to payment options/form for authenticated users
// Showing profile information/ edit profile information

const Reports = props => {
  return (
      <>
        <main className="explorer">
          <div>
            <Link className="nav-link" to={`/incomplete-orders`}>
                <h4>Incomplete Orders</h4>
            </Link>
          </div>
        </main>
      </>
  )
}

export default withRouter(Reports);
