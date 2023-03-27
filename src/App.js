import "./App.css"
import "../src/styles/MoodboardOne.css"
import "../src/styles/MoodboardTwo.css"
import "../src/styles/MoodboardThree.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/Navbar.jsx"
import Login from "./components/Login"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import MoodboardTemplateFour from "./components/MoodboardTemplateFour"

function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const loginStatus = useSelector((state) => state.currentUser.loginStatus)

  useEffect(() => {
    if (currentUser) {
      console.log("User has logged in.")
    } else {
      console.log("User has logged out.")
    }
  }, [currentUser, loginStatus])

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
                <Route path="/template-four" element={<MoodboardTemplateFour />} />
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
