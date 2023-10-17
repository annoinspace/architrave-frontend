import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { Button, Form, Container, Alert } from "react-bootstrap"
import { getAccessToken } from "../redux/actions/userActions"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const loginStatus = useSelector((state) => state.currentUser.loginStatus)
  const loginStatusMessage = loginStatus?.status
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [usernameForm, setUsernameForm] = useState(true)

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   loginUser()
  // }

  const loginWithEmailHandler = (e) => {
    e.preventDefault()
    const credentialEmail = {
      email: email,
      password: password
    }
    console.log("logging in")
    dispatch(getAccessToken(credentialEmail))
  }
  const loginWithUsernameHandler = (e) => {
    e.preventDefault()
    const credentialUsername = {
      username: username,
      password: password
    }
    console.log("logging in")
    dispatch(getAccessToken(credentialUsername))
  }

  const usernameClickedHandler = () => {
    setUsernameForm(true)
  }
  const emailClickedHandler = () => {
    setUsernameForm(false)
  }

  useEffect(() => {
    console.log("-------checking the login status", loginStatus)
    if (loginStatusMessage === "success") {
      navigate("/home")
    }
  }, [loginStatus])

  return (
    <Container id="login-wrapper" className="p-5">
      <div id="architrave-info">
        <h1 style={{ fontSize: "2.5rem" }} className="mb-5">
          smarter planning for your
          <br /> projects starts here
        </h1>
        <div>
          With Architrave planning your interior design projects is easy and convenient. Simply list the products you'd
          like to use in your project, create a moodboard and fill in the necessary budget information
        </div>
      </div>
      <div id="login-form-wrapper">
        <div id="login-oval-wrapper"></div>
        <div id="login-form">
          <h4>login</h4>
          {loginStatus?.status === "fail" && (
            <Alert variant="danger" id="login-fail">
              {loginStatus.message}
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="d-flex justify-content-between">
                <Form.Label
                  className={usernameForm ? "login-option-none" : "login-option"}
                  onClick={emailClickedHandler}
                >
                  Email
                </Form.Label>
                <Form.Label
                  className={usernameForm ? "login-option" : "login-option-none"}
                  onClick={usernameClickedHandler}
                >
                  Username
                </Form.Label>
              </div>
              {usernameForm ? (
                <>
                  <Form.Control
                    type="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                  />
                  <Form.Text className="text-muted">Usernames are case sensitive.</Form.Text>
                </>
              ) : (
                <>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                  <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </>
              )}
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
            {usernameForm ? (
              <Button
                style={{ backgroundColor: "rgb(132, 112, 112)", border: "none" }}
                onClick={loginWithUsernameHandler}
              >
                Submit
              </Button>
            ) : (
              <Button style={{ backgroundColor: "rgb(132, 112, 112)", border: "none" }} onClick={loginWithEmailHandler}>
                Submit
              </Button>
            )}
          </Form>{" "}
        </div>
      </div>
    </Container>
  )
}
