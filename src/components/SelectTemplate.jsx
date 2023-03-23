import React from "react"
import { Container, Image } from "react-bootstrap"
import templateOne from "../assets/template-one.jpeg"
import templateTwo from "../assets/template-two.jpeg"
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
      <h1 className="text-center mb-5">Select a template</h1>
      <div className="template-wrapper">
        <Image src={templateOne} className="template-jpeg" onClick={handleTemplateOneClicked} />
        <Image src={templateTwo} className="template-jpeg" onClick={handleTemplateTwoClicked} />
      </div>
    </Container>
  )
}
