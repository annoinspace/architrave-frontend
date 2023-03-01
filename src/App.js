import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Curated from "./components/Curated.jsx"
import Navbar from "./components/Navbar.jsx"
function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Curated />
      </div>
    </>
  )
}

export default App
