import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { TbLineDotted } from "react-icons/tb"
import { Container, Button, Form, Alert } from "react-bootstrap"
import {
  changeCurrencyAction,
  changeEmailAction,
  changePasswordAction,
  changeUsernameAction
} from "../redux/actions/userActions"

export default function Profile() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const passwordChangeError = useSelector((state) => state.currentUser.passwordError)
  const [username, setUsername] = useState(currentUser.username)
  const [editUsername, setEditUsername] = useState(false)
  const [email, setEmail] = useState(currentUser.email)
  const [editEmail, setEditEmail] = useState(false)
  const [currency, setCurrency] = useState(currentUser.currency)
  const [editCurrency, setEditCurrency] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [editPassword, setEditPassword] = useState(false)

  const [newPassword1, setNewPassword1] = useState("")

  const dispatch = useDispatch()

  const saveNameChangeHandler = () => {
    console.log("username", username)
    dispatch(changeUsernameAction(username))
    setEditUsername(false)
  }
  const saveEmailChangeHandler = () => {
    console.log("email", email)
    dispatch(changeEmailAction(email))
    setEditEmail(false)
  }
  const saveCurrencyChangeHandler = () => {
    console.log("currency", currency)
    dispatch(changeCurrencyAction(currency))
    setEditCurrency(false)
  }
  const savePasswordChangeHandler = () => {
    console.log("------sending the new password info--------")
    const fields = {
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword1
    }
    dispatch(changePasswordAction(fields))
    setEditPassword(false)
  }

  return (
    <Container className="p-5" id="profile-container">
      <div className="header-top">
        <h1 className="text-center mb-5">Profile Settings</h1>
      </div>
      <div>
        <div className="profile-list-item-container">
          {editUsername ? (
            <>
              <Form.Group controlId="username-change-form">
                <Form.Control
                  className="username-change-form"
                  type="text"
                  placeholder={username}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
              </Form.Group>{" "}
              <Button variant="success" onClick={saveNameChangeHandler}>
                Confirm Changes
              </Button>
              <Button variant="outline-secondary" className="ml-1" onClick={() => setEditUsername(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <div className="profile-list-item">Username: {username}</div>
              <Button variant="outline-success" onClick={() => setEditUsername(true)}>
                Change Username
              </Button>
            </>
          )}
        </div>
        <div className="profile-list-item-container">
          {editEmail ? (
            <>
              <Form.Group controlId="email-change-form">
                <Form.Control
                  className="email-change-form"
                  type="text"
                  placeholder={email}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </Form.Group>{" "}
              <Button variant="success" onClick={saveEmailChangeHandler}>
                Confirm Changes
              </Button>
              <Button variant="outline-secondary" className="ml-1" onClick={() => setEditEmail(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <div className="profile-list-item">Email: {email}</div>
              <Button variant="outline-success" onClick={() => setEditEmail(true)}>
                Change Email
              </Button>
            </>
          )}
        </div>
        <div className="profile-list-item-container">
          {editCurrency ? (
            <>
              <Form.Group controlId="currency-change-form">
                <Form.Control
                  className="currency-change-form"
                  type="text"
                  placeholder={currency}
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value)
                  }}
                />
              </Form.Group>{" "}
              <Button variant="success" onClick={saveCurrencyChangeHandler}>
                Confirm Changes
              </Button>
              <Button variant="outline-secondary" className="ml-1" onClick={() => setEditCurrency(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <div className="profile-list-item">Currency: {currency}</div>
              <Button variant="outline-success" onClick={() => setEditCurrency(true)}>
                Change Currency
              </Button>
            </>
          )}
        </div>
        <div>
          {passwordChangeError !== null && (
            <Alert variant="danger" id="password-change-fail" className="mt-4">
              Password change fail: {passwordChangeError}
            </Alert>
          )}
          <div className="profile-list-item-container">
            {editPassword ? (
              <div className="">
                <h6 className="">Change Password</h6>
                <Form.Group controlId="password-change-form">
                  <Form.Control
                    className="password-change-form"
                    type="password"
                    placeholder={"enter current password"}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value)
                    }}
                  />
                  <Form.Text className="text-muted">Enter your current password.</Form.Text>
                </Form.Group>{" "}
                <Form.Group controlId="password-change-form">
                  <Form.Control
                    className="password-change-form"
                    type="password"
                    placeholder={""}
                    value={newPassword1}
                    onChange={(e) => {
                      setNewPassword1(e.target.value)
                    }}
                  />
                  <Form.Text className="text-muted">Enter your new password.</Form.Text>
                </Form.Group>{" "}
                <Button variant="success" onClick={savePasswordChangeHandler}>
                  Confirm Changes
                </Button>
                <Button variant="outline-secondary" className="ml-1" onClick={() => setEditPassword(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <div className="profile-list-item">
                  Password:
                  <div className="d-flex">
                    <TbLineDotted style={{ fontSize: "50px" }} />
                  </div>
                </div>
                <Button variant="outline-success" onClick={() => setEditPassword(true)}>
                  Change Password
                </Button>
              </>
            )}
          </div>{" "}
        </div>
      </div>
    </Container>
  )
}
