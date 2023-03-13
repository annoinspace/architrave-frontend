import React from "react"
import { useSelector } from "react-redux"
import { Container, Image } from "react-bootstrap"

export default function NewProjectDetails() {
  const moodboard = useSelector((state) => state.moodboard.moodboard)
  console.log("moodboard", moodboard)
  return (
    <Container className="p-5">
      <div>moodboard settings</div>
      {/* <Image src={moodboardImage} /> */}
    </Container>
  )
}
