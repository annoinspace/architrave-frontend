import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, updateUserLocation } from "../redux/actions/userActions"
import { Link, useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const userLocation = useSelector((state) => state.currentUser.userLocation)

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

  useEffect(() => {
    console.log("location from useLocation()", location.pathname)
    console.log("current location from state", userLocation)
    dispatch(updateUserLocation(location.pathname))
  }, [userLocation, location])

  return (
    <div id="navbar">
      <div className="nav-link" id="architrave-nav">
        Architrave
      </div>

      {userLocation === "/signup" && (
        <Link to="/">
          <div className="nav-link" id="login-nav">
            Login
          </div>
        </Link>
      )}
      {userLocation === "/" && (
        <Link to="/signup">
          <div className="nav-link" id="sign-up-nav">
            Signup
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
