import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container, Button, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { saveSelectedProject } from "../redux/actions/moodboardActions"

export default function Homepage() {
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const allProjects = useSelector((state) => state.moodboard.currentUserProjects)

  const dispatch = useDispatch()
  const handleCreateProjectClick = () => {
    navigate("/new-project")
  }

  const projectClickedHandler = (project) => {
    dispatch(saveSelectedProject(project))
    navigate(`/project-details/${project._id}`)
  }

  useEffect(() => {
    console.log("allProjects", allProjects)
  }, [allProjects])

  return (
    <Container className="p-5">
      <div className="header-top">
        <h1 className="text-center mb-5">My Projects</h1>
      </div>
      <div id="project-preview-wrapper">
        <Button id="create-project-button" onClick={handleCreateProjectClick}>
          + Create Project
        </Button>

        {allProjects?.length === 0 && <div>create your first project!</div>}
        {allProjects?.length > 0 && (
          <div id="projects-thumbnail-wrapper">
            {allProjects.map((project) => (
              <div key={project._id} onClick={() => projectClickedHandler(project)}>
                <div>{project.title}</div>
                <Image src={project.moodboardImage} id="projects-thumbnail-image" />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}
