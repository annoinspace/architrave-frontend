import React from "react"
import { Button, Container } from "react-bootstrap"
import ImageUpload from "./ImageUpload"

export default function MyLibrary() {
  return (
    <Container className="p-5">
      <div className="header-top">
        <h1 className="text-center">My Library</h1>
      </div>
      <div>
        <div className="d-flex justify-content-between">
          <h3>colour palettes</h3>

          <ImageUpload />
        </div>
        <div>colors</div>
      </div>
      <div>
        <h3>solo swatches</h3>
        <div>colors</div>
      </div>
      <div>
        <h3>images</h3>
        <div>images</div>
      </div>
      <div id="my-swatches"></div>
    </Container>
  )
}
