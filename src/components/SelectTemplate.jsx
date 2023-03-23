import React from "react"
import { Container, Image } from "react-bootstrap"
import templateOne from "../assets/template-one.jpeg"
import { useNavigate } from "react-router-dom"

export default function SelectTemplate() {
  const navigate = useNavigate()
  const handleTemplateOneClicked = () => {
    navigate("/template-one")
  }
  const handleTemplateTwoClicked = () => {
    navigate("/template-two")
  }

  return (
    <Container className="p-5">
      <Image src={templateOne} className="template-jpeg" onClick={handleTemplateOneClicked} />
      <div className="template-jpeg" onClick={handleTemplateTwoClicked}>
        {" "}
        template 2
      </div>
    </Container>
  )
}
