import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../redux/actions/userActions"

export default function Navbar() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const [loggedInNav, setLoggedInNav] = useState(false)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    console.log("logout clicked")
    dispatch(logoutUser())
  }
  useEffect(() => {
    if (currentUser === null) {
      setLoggedInNav(false)
    } else {
      setLoggedInNav(true)
    }
  }, [currentUser])
  return (
    <div id="navbar">
      <div className="nav-link" id="architrave-nav">
        Architrave
      </div>
      <div className="nav-link" id="sign-up-nav">
        Sign Up
      </div>

      {loggedInNav && (
        <>
          <div className="nav-link">Architrave</div>
          <div className="nav-link">Curated</div>
          <div className="nav-link">My Library</div>
          <div className="nav-link">Profile</div>
          <div className="nav-link border" onClick={logoutHandler}>
            {" "}
            Logout
          </div>
        </>
      )}
    </div>
  )
}
