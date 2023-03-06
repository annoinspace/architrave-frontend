import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Curated from "./components/Curated.jsx"
import Navbar from "./components/Navbar.jsx"
import Login from "./components/Login"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/SignUp"
function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  useEffect(() => {
    if (currentUser) {
      console.log("User has logged in.")
    } else {
      console.log("User has logged out.")
    }
  }, [currentUser])
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            {currentUser === null && (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </>
            )}
            {currentUser && (
              <>
                <Route path="/home" element={<Curated />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
