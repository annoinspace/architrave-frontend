import React from "react"
import { useSelector } from "react-redux"
import { Container, Image } from "react-bootstrap"

export default function NewProjectDetails() {
  const moodboardComponent = useSelector((state) => state.moodboard.moodboardComponents)
  const moodboardImage = moodboardComponent.moodboard.moodboardImage
  const title = moodboardComponent.title
  const summary = moodboardComponent.summary
  console.log("moodboardComponent", moodboardComponent)
  console.log("moodboardImage", moodboardImage)
  return (
    <Container className="p-5">
      <div>{title}</div>
      <div>{summary}</div>
      <Image src={moodboardImage} id="moodboard-jpeg" />
      <div></div>
    </Container>
  )
}
