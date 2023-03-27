import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container, Button, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import {
  moveProjectToArchive,
  saveSelectedProject,
  saveSelectedArchiveProject
} from "../redux/actions/moodboardActions"

export default function Homepage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const userName = currentUser.displayName
  const allProjects = useSelector((state) => state.moodboard.currentUserProjects)

  const [greetingMessage, setGreetingMessage] = useState("Good Morning,")

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

  const renderCurrentTime = () => {
    const currentTime = new Date().getHours()

    if (currentTime >= 12 && currentTime < 17) {
      setGreetingMessage("Good Afternoon,")
    } else if (currentTime >= 16 && currentTime < 22) {
      setGreetingMessage("Good Evening,")
    }
  }

  useEffect(() => {
    console.log("allProjects", allProjects)
    const active = allProjects?.filter((project) => project.status === "Active")
    setActiveProjects(active)
    const archived = allProjects?.filter((project) => project.status === "Archived")
    setArchivedProjects(archived)
    renderCurrentTime()
  }, [allProjects])

  useEffect(() => {
    console.log("moving ball id", clickedBall)
  }, [clickedBall])

  return (
    <>
      <Container className="pt-5 pl-5 pr-5 z-2">
        <div className="header-top">
          <div id="greeting-wrapper" className="text-center mb-5 mt-5  ">
            <h1 className="w-50 h-50 text-right large-header mb-4">
              {greetingMessage} {userName}!
            </h1>
            <h4 id="header-tagline">It's the perfect time bring ideas to life.</h4>
            <div id="header-border"></div>
          </div>
        </div>
        <div id="project-preview-wrapper">
          <Button id="create-project-button" onClick={handleCreateProjectClick}>
            + Create Project
          </Button>

          <h4 className="mt-3 brown-underline">Active Projects</h4>
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
          <h4 className="mt-3 brown-underline">Archived Projects</h4>
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
      <div id="footer">
        <Image id="footer-icon" src={logo} />
        <div></div>
      </div>
    </>
  )
}
