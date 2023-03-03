import React, { useState } from "react"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { Button, Form, Container } from "react-bootstrap"
import { getAccessToken } from "../redux/actions/userActions"

export default function Login() {
  //   const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
    loginUser()
  }

  const loginUser = () => {
    const credentials = {
      email: email,
      password: password
    }
    console.log("logging in")
    dispatch(getAccessToken(credentials))
  }

  return (
    <Container id="login-wrapper" className="p-5">
      <div id="architrave-info">
        <h1>
          smarter planning for your
          <br /> projects starts here
        </h1>
        <div>
          With Architrave planning yor interior design projects is easy and convenient. Simply list the products you'd
          like to use in your project, create a moodboard and fill in the necessary budget information
        </div>
      </div>
      <div>
        <div id="login-oval-wrapper">
          <h4>login</h4>
          {/* <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form> */}
        </div>
      </div>
    </Container>
  )
}