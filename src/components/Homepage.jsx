import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container, Button, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {
  moveProjectToArchive,
  saveSelectedProject,
  saveSelectedArchiveProject
} from "../redux/actions/moodboardActions"

export default function Homepage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const allProjects = useSelector((state) => state.moodboard.currentUserProjects)

  // const [hoveredProject, setHoveredProject] = useState(null)
  const [clickedBall, setClickedBall] = useState(null)
  const [activeProjects, setActiveProjects] = useState(allProjects?.filter((project) => project.status === "Active"))
  const [archivedProjects, setArchivedProjects] = useState(
    allProjects?.filter((project) => project.status === "Archived")
  )

  const toggleStatusBallHandler = (project) => {
    const projectId = project._id
    setClickedBall((prevState) => (prevState === projectId ? null : projectId))
    dispatch(moveProjectToArchive(projectId))

    setTimeout(() => {
      setActiveProjects(activeProjects.filter((p) => p._id !== projectId))
      setArchivedProjects([...archivedProjects, project])
    }, 3000)
  }

  // const setHoveredProjectHandler = (project) => {
  //   console.log(project)
  //   setHoveredProject(project)
  // }

  const handleCreateProjectClick = () => {
    navigate("/new-project")
  }

  const projectClickedHandler = (project) => {
    dispatch(saveSelectedProject(project))
    navigate(`/project-details/${project._id}`)
  }
  const archivedProjectClickedHandler = (project) => {
    dispatch(saveSelectedArchiveProject(project))
    navigate(`/archive/${project._id}`)
  }

  useEffect(() => {
    console.log("allProjects", allProjects)
    const active = allProjects?.filter((project) => project.status === "Active")
    setActiveProjects(active)
    const archived = allProjects?.filter((project) => project.status === "Archived")
    setArchivedProjects(archived)
  }, [allProjects])

  useEffect(() => {
    console.log("moving ball id", clickedBall)
  }, [clickedBall])

  return (
    <Container className="p-5">
      <div className="header-top">
        <h1 className="text-center mb-5">My Projects</h1>
      </div>
      <div id="project-preview-wrapper">
        <Button id="create-project-button" onClick={handleCreateProjectClick}>
          + Create Project
        </Button>

        <h4>Active Projects</h4>
        {activeProjects?.length === 0 && <div id="projects-thumbnail-wrapper-empty">no active projects!</div>}
        {activeProjects?.length > 0 && (
          <div id="projects-thumbnail-wrapper">
            {activeProjects.map((project) => (
              <div
                key={project._id}
                className="project-status-thumbnail-wrapper"
                // onMouseEnter={() => setHoveredProjectHandler(project)}
              >
                <div onClick={() => projectClickedHandler(project)} className="thumbnail-wrapper">
                  <h5 className="mb-3">{project.title}</h5>
                  <Image src={project.moodboardImage} id="projects-thumbnail-image" />
                </div>
                <div className="status-container">
                  <div className="status-wrapper">
                    <div
                      className="status-ball-indicator"
                      onClick={() => toggleStatusBallHandler(project)}
                      style={{
                        left: clickedBall === project._id ? "87%" : "0%",
                        transition: "left 3s"
                      }}
                    ></div>
                  </div>
                  <div className="active-archive">
                    <div>Active</div>
                    <div>Archived</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <h4>Archived Projects</h4>
        {archivedProjects?.length === 0 && <div>your archived projects will appear here</div>}
        {archivedProjects?.length > 0 && (
          <div id="archived-projects-thumbnail-wrapper">
            {archivedProjects.map((project) => (
              <div
                key={project._id}
                onClick={() => archivedProjectClickedHandler(project)}
                className="project-status-thumbnail-wrapper"
              >
                <div className="thumbnail-wrapper">
                  <h5 className="mb-3">{project.title}</h5>
                  <Image src={project.moodboardImage} id="projects-thumbnail-image" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}
