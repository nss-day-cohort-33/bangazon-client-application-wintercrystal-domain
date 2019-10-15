import React, { useRef, useState, useEffect} from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

//Author: Mary West
//Purpose: Edit Profile
//Methods: PUT

const ProfileEditForm = props => {
  const last_name = useRef()
  const phone_number = useRef()
  const address = useRef()
  const { isAuthenticated } = useSimpleAuth()
  const [currentProfile, setCurrentProfile] = useState({})

// PUT request updates last name, phone number, and address

  useEffect(()=>{
    last_name.current.value = props.history.location.state.user.last_name
    phone_number.current.value = props.history.location.state.phone_number
    address.current.value = props.history.location.state.address
  },[])

  const updateProfile = () => {
    // const updatedProfile = {
    //   phone_number: '',
    //   address: '',
    //   user: localStorage.getItem( "id" )
    // }
      if (isAuthenticated()) {
          fetch(`http://localhost:8000/customers/${props.history.location.state.id}`, {
              "method": "PUT",
              "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
              },
              "body": JSON.stringify({
                "last_name": last_name.current.value,
                "phone_number": phone_number.current.value,
                "address": address.current.value
            })
          })
              .then(() => {
                props.history.push("/profile")
              })

      }
  }

  return (
    <>
      <h1>Edit Profile</h1>
      <form className="profileList" onSubmit={(e) => {
        e.preventDefault()
        updateProfile()
      }}>
        <fieldset>
          <label htmlFor="last_name">Last Name:</label>
          <input type="text"
          ref={last_name}
          name="last_name"
          // value ={updatedProfile.user.last_name}
          // onChange = {setCurrentProfile}
          required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="phone_number">Phone Number:</label>
          <input type="text"
          ref={phone_number}
          name="phone_number"
          // value ={updatedProfile.phone_number}
          // onChange = {setCurrentProfile}
          required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="address">Address:</label>
          <input
          type="text"
          ref={address}
          name="address"
          // value ={updatedProfile.address}
          // onChange = {setCurrentProfile}
          required></input>
        </fieldset>
        <button type="submit">Update Profile</button>
        {/* <button onClick={() => {
            setCurrentProfile()
        }}>Edit Me</button> */}
      </form>
    </>
  )
}

export default ProfileEditForm