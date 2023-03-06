import React from "react"
import { Container } from "react-bootstrap"

export default function Homepage() {
  return (
    <Container className="p-5">
      <div className="header-top">
        <h1 className="text-center">My Projects</h1>
        <div>create project</div>
      </div>
      <div id="project-preview-wrapper"></div>
    </Container>
  )
}
