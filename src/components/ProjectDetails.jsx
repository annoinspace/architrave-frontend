import React from "react"
import { useSelector } from "react-redux"
import { Container, Image } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function ProjectDetails() {
  const { projectId } = useParams()
  const selectedProject = useSelector((state) => state.moodboard.selectedProject)

  // const initialisedProject = useSelector((state) => state.moodboard.initialisedProject)

  const moodboardImage = selectedProject.moodboardImage
  const title = selectedProject.title
  const summary = selectedProject.summary
  console.log("moodboardComponent", selectedProject)
  console.log("moodboardImage", moodboardImage)
  return (
    <Container className="p-5">
      <div>{projectId}</div>
      <div>{title}</div>
      <div>{summary}</div>
      <Image src={moodboardImage} id="moodboard-jpeg" />
      <div></div>
    </Container>
  )
}
