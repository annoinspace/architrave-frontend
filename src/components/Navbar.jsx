import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, updateUserLocation } from "../redux/actions/userActions"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { getAllUserProjects } from "../redux/actions/moodboardActions"

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const userLocation = useSelector((state) => state.currentUser.userLocation)

  const [loggedInNav, setLoggedInNav] = useState(false)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    console.log("logout clicked")
    dispatch(logoutUser())
    navigate("/")
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

  const homeHandler = () => {
    console.log("home clicked")

    dispatch(getAllUserProjects())

    setTimeout(() => {
      navigate("/home")
    }, 500)
  }

  useEffect(() => {
    console.log("location from useLocation()", location.pathname)
    console.log("current location from state", userLocation)
    dispatch(updateUserLocation(location.pathname))
  }, [userLocation, location])

  return (
    <div id="navbar">
      {currentUser === null && userLocation === "/signup" && (
        <>
          <div className="nav-link architrave-text-nav ml-3" id="architrave-nav">
            architrave
          </div>

          <Link to="/">
            <div className="nav-link" id="login-nav">
              Login
            </div>
          </Link>
        </>
      )}
      {currentUser === null && userLocation === "/" && (
        <>
          <div className="nav-link architrave-text-nav ml-3" id="architrave-nav">
            architrave
          </div>
          <Link to="/signup">
            <div className="nav-link" id="sign-up-nav">
              Signup
            </div>
          </Link>
        </>
      )}

      {loggedInNav && (
        <>
          <div className="d-flex w-100 justify-content-between align-items-center nav-background">
            <div className="d-flex">
              {userLocation === "/my-library" ||
              userLocation === "/new-project" ||
              userLocation.includes("/archive") ||
              userLocation.includes("/template") ||
              userLocation.includes("/select-template") ? (
                <div className="nav-link architrave-text-nav ml-3" id="architrave-nav" onClick={homeHandler}>
                  architrave
                </div>
              ) : (
                <div className="nav-link text-white architrave-text-nav ml-3" id="architrave-nav" onClick={homeHandler}>
                  architrave
                </div>
              )}
            </div>
            <div className="d-flex">
              <div className="nav-link " onClick={() => navigate("/my-library")}>
                Library
              </div>
              <div className="nav-link" onClick={() => navigate("/profile")}>
                Profile
              </div>
              <div className="nav-link mr-3" onClick={logoutHandler}>
                {" "}
                Logout
              </div>
            </div>
          </div>
          {(userLocation === "/home" || userLocation.includes("/project-details")) && (
            <div id="curved-background">
              <div id="gradient-one"></div>
              <div id="gradient-two"></div>
              <div id="flare-1"></div>
              <div id="flare-2"></div>
              <div id="flare-3"></div>
              <div id="cutout-background"></div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
