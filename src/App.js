import "./App.css"
import "../src/styles/MoodboardOne.css"
import "../src/styles/MoodboardTwo.css"
import "../src/styles/MoodboardThree.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Curated from "./components/Curated.jsx"
import Navbar from "./components/Navbar.jsx"
import Login from "./components/Login"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import SignUp from "./components/SignUp"
import Homepage from "./components/Homepage"
import MyLibrary from "./components/MyLibrary"
import NewProject from "./components/NewProject"
import MoodboardTemplateOne from "./components/MoodboardTemplateOne"
import MoodboardTemplateTwo from "./components/MoodboardTemplateTwo"
import MoodboardTemplateThree from "./components/MoodboardTemplateThree"
import ProjectDetails from "./components/ProjectDetails"
import Profile from "./components/Profile"
import ArchivedProject from "./components/ArchivedProject"
import SelectTemplate from "./components/SelectTemplate"
// import { updateUserLocation } from "./redux/actions/userActions"
function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const loginStatus = useSelector((state) => state.currentUser.loginStatus)
  // const userLocation = useSelector((state) => state.currentUser.userLocation)
  // const loginStatusMessage = loginStatus?.status

  // const location = useLocation()
  // const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser) {
      console.log("User has logged in.")
    } else {
      console.log("User has logged out.")
    }
  }, [currentUser, loginStatus])

  // useEffect(() => {
  //   console.log("location from useLocation() in app", location.pathname)
  //   console.log("current location from state in app", userLocation)
  //   dispatch(updateUserLocation(location.pathname))
  // }, [userLocation, location])

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {currentUser && (
              <>
                <Route path="/home" element={<Homepage />} />
                <Route path="/my-library" element={<MyLibrary />} />
                <Route path="/new-project" element={<NewProject />} />
                <Route path="/select-template" element={<SelectTemplate />} />
                <Route path="/template-one" element={<MoodboardTemplateOne />} />
                <Route path="/template-two" element={<MoodboardTemplateTwo />} />
                <Route path="/template-three" element={<MoodboardTemplateThree />} />
                <Route path="/project-details/:projectId" element={<ProjectDetails />} />
                <Route path="/archive/:projectId" element={<ArchivedProject />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
