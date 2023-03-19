import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container } from "react-bootstrap"
export default function Profile() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)

  return (
    <Container className="p-5" id="profile-container">
      <div>
        <div className="profile-list-item">Username: {currentUser.username}</div>
        <div className="profile-list-item">Email: {currentUser.email}</div>
        <div className="profile-list-item">Currency: {currentUser?.currency}</div>
      </div>
    </Container>
  )
}
