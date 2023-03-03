import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Curated from "./components/Curated.jsx"
import Navbar from "./components/Navbar.jsx"
import Login from "./components/Login"
import { useSelector } from "react-redux"
import { useEffect } from "react"
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
        {currentUser === null && (
          <>
            <Navbar />
            <Login />
          </>
        )}
        {currentUser && (
          <>
            <Navbar />
            <Curated />
          </>
        )}
      </div>
    </>
  )
}

export default App
