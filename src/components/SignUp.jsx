import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { Button, Form, Container, Alert } from "react-bootstrap"
import { getAccessToken, signupUser } from "../redux/actions/userActions"
import { useLocation, useParams } from "react-router-dom"

export default function SignUp() {
  //   const navigate = useNavigate()
  const status = useSelector((state) => state.currentUser.signUpStatus)
  const location = useLocation()
  const params = useParams()

  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [currency, setCurrency] = useState("")
  const isFormIncomplete = !email || !password || !username || !displayName || !currency
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, displayName, email, password)

    const credentials = {
      displayName: displayName,
      username: username,
      email: email,
      password: password
    }
    console.log("signing up")
    dispatch(signupUser(credentials))
    setEmail("")
    setPassword("")
    setUsername("")
    setDisplayName("")
  }
  useEffect(() => {
    console.log("location", location.pathname)
    console.log("status", status)
  }, [status])

  return (
    <Container id="login-wrapper" className="p-5">
      <div id="architrave-info">
        <h1>
          smarter planning for your
          <br /> projects starts here
        </h1>
        <div>
          With Architrave planning your interior design projects is easy and convenient. Simply list the products you'd
          like to use in your project, create a moodboard and fill in the necessary budget information
        </div>
      </div>
      <div id="signup-form-wrapper">
        <div id="signup-form">
          <h4>Signup</h4>
          {status?.status === "fail" && <Alert variant="danger">{status.message}</Alert>}
          {status?.status === "success" && <Alert variant="success">{status.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="l">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value)
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-4" controlId="">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
              <Form.Text className="text-muted mb-4">Usernames are case-sensitive</Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicChrrency">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Currency"
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value)
                }}
              />
              <Form.Text className="text-muted mb-4">Please enter your desired currency e.g £</Form.Text>
            </Form.Group>

            <Button
              style={{ backgroundColor: "rgb(132, 112, 112)", border: "none" }}
              type="submit"
              disabled={isFormIncomplete}
            >
              Submit
            </Button>
          </Form>{" "}
        </div>
      </div>
    </Container>
  )
}
