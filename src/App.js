import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Curated from "./components/Curated.jsx"
import Navbar from "./components/Navbar.jsx"
import Login from "./components/Login"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/SignUp"
import Homepage from "./components/Homepage"
import MyLibrary from "./components/MyLibrary"
import NewProject from "./components/NewProject"
function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const loginStatus = useSelector((state) => state.currentUser.loginStatus)
  const loginStatusMessage = loginStatus?.status

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
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
