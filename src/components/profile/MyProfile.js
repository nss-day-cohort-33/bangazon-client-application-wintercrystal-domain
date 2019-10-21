import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Link } from "react-router-dom";

// Author: Dustin Hobson/ Mary West
// Purpose: Render 'My Profile' Page with functioning links to payment options/form for authenticated users
// Showing profile information/ edit profile information

const Profile = props => {
  const [customer, setCustomer] = useState({user:{}});
  const { isAuthenticated } = useSimpleAuth();

  const getCustomers = () => {
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/customers`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`
        }
      })
        .then(response => response.json())
        .then(customers => {
          const customer = customers.find(customer => {
            return customer.id === parseInt(localStorage.getItem("id"))
          });
          setCustomer(customer);
        });
    }
  };

  useEffect(() => {

    getCustomers()
  }, []);


  return (
      <>
        <main className="explorer">
          <div>
            <ul>
              <p>
                <b>First Name:</b> {customer.user.first_name}
              </p>
              <p>
                <b>Last Name:</b> {customer.user.last_name}
              </p>
              <p>
                <b>Email:</b> {customer.user.email}
              </p>
              <p>
                <b>Phone Number:</b> {customer.phone_number}
              </p>
              <p>
                <b>Address:</b> {customer.address}
              </p>
            </ul>
            <Link className="nav-link" to = {{
                pathname: "/profile/update",
                state: customer
            }} >
              <h6>Edit Profile</h6>
            </Link>
            <Link className="nav-link" to={`/payment/options`}>
              <h4>Payment Options</h4>
            </Link>
            <Link className="nav-link" to={`/payment/create`}>
              <h4>Add New Payment Type</h4>
            </Link>
            <Link className="nav-link" to={`/orderhistory`}>
              <h4>View Order History</h4>
            </Link>

            <h3> Average Product rating from Customers: {(+customer.avg_rating).toFixed(2)}</h3>
          </div>
        </main>
      </>
  )
}

export default withRouter(Profile);
