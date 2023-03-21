import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BsDot } from "react-icons/bs"
import { Container, Button, Form } from "react-bootstrap"
import { changeUsernameAction } from "../redux/actions/userActions"
export default function Profile() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const [username, setUsername] = useState(currentUser.username)
  const [editUsername, setEditUsername] = useState(false)
  const [email, setEmail] = useState(currentUser.email)
  const [editEmail, setEditEmail] = useState(false)
  const [currency, setCurrency] = useState(currentUser.currency)
  const [editCurrency, setEditCurrency] = useState(false)

  const dispatch = useDispatch()

  const saveNameChangeHandler = () => {
    console.log("username", username)
    dispatch(changeUsernameAction(username))
    setEditUsername(false)
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
              <Button variant="outline-secondary" className="ml-3" onClick={() => setEditUsername(false)}>
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
          <div></div>
        </div>
        <div className="profile-list-item-container">
          <div className="profile-list-item">Email: {email}</div>
          <div>
            {editEmail ? (
              <>
                <Button variant="success">Confirm Changes</Button>
                <Button variant="outline-secondary" className="ml-3" onClick={() => setEditEmail(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outline-success" onClick={() => setEditEmail(true)}>
                Change Email
              </Button>
            )}
          </div>
        </div>
        <div className="profile-list-item-container">
          <div className="profile-list-item">Currency: {currency}</div>
          <div>
            {editCurrency ? (
              <>
                <Button variant="success">Confirm Changes</Button>
                <Button variant="outline-secondary" className="ml-3" onClick={() => setEditCurrency(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outline-success" onClick={() => setEditCurrency(true)}>
                Change Currency
              </Button>
            )}
          </div>
        </div>
        <div className="profile-list-item-container">
          <div className="profile-list-item">
            Password:
            <div className="d-flex">
              <BsDot />
              <BsDot />
              <BsDot />
              <BsDot />
              <BsDot />
              <BsDot />
              <BsDot />
              <BsDot />
              <BsDot />
            </div>
          </div>
          <div>
            <Button variant="outline-success">Change Password</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
