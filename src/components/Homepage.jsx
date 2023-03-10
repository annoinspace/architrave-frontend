import React from "react"
import { useSelector } from "react-redux"
import { Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Homepage() {
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const allProjects = currentUser?.projects
  const handleCreateProjectClick = () => {
    navigate("/new-project")
  }

  return (
    <Container className="p-5">
      <div className="header-top">
        <h1 className="text-center mb-5">My Projects</h1>
      </div>
      <div id="project-preview-wrapper">
        <Button id="create-project-button" onClick={handleCreateProjectClick}>
          + Create Project
        </Button>

        {allProjects.length === 0 && <div>create your first project!</div>}
      </div>
    </Container>
  )
}
