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
function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const loginStatus = useSelector((state) => state.currentUser.loginStatus)
  const loginStatusMessage = loginStatus?.status

  useEffect(() => {
    if (currentUser) {
      console.log("User has logged in.")
      console.log("current user", currentUser)
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
            {/* {currentUser === null && (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </>
            )} */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {currentUser && (
              <>
                <Route path="/home" element={<Homepage />} />
                <Route path="/my-library" element={<MyLibrary />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
