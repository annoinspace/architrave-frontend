import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../redux/actions/userActions"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const [loggedInNav, setLoggedInNav] = useState(false)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    console.log("logout clicked")
    dispatch(logoutUser())
  }
  const signUpHandler = () => {
    console.log("sign up clicked")
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
      {loggedInNav === false && (
        <Link to="/signup">
          <div className="nav-link" id="sign-up-nav">
            Sign Up
          </div>
        </Link>
      )}

      {loggedInNav && (
        <>
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
