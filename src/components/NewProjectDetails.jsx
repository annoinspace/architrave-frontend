import React from "react"
import { useSelector } from "react-redux"
import { Container, Image } from "react-bootstrap"

export default function NewProjectDetails() {
  const moodboardComponent = useSelector((state) => state.moodboard.moodboardComponents)
  const moodboardImage = moodboardComponent.moodboard.moodboardImage
  console.log("moodboardComponent", moodboardComponent)
  console.log("moodboardImage", moodboardImage)
  return (
    <Container className="p-5">
      <div>moodboard settings</div>

      <Image src={moodboardImage} id="moodboard-jpeg" />
    </Container>
  )
}
