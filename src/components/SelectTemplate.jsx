import React from "react"
import { Container, Image } from "react-bootstrap"
import templateOne from "../assets/template-one.jpeg"
import templateTwo from "../assets/template-two.jpeg"
import templateThree from "../assets/template-three.jpeg"
import templateFour from "../assets/template-four.jpeg"
import { useNavigate } from "react-router-dom"

export default function SelectTemplate() {
  const navigate = useNavigate()
  const handleTemplateOneClicked = () => {
    navigate("/template-one")
  }
  const handleTemplateTwoClicked = () => {
    navigate("/template-two")
  }
  const handleTemplateThreeClicked = () => {
    navigate("/template-three")
  }
  const handleTemplateFourClicked = () => {
    navigate("/template-four")
  }

  return (
    <Container className="p-5">
      <h1 className="text-center mb-5 mt-5">Select a template</h1>
      <div id="header-border"></div>
      <div className="template-wrapper">
        <Image src={templateOne} className="template-jpeg" onClick={handleTemplateOneClicked} />
        <Image src={templateTwo} className="template-jpeg" onClick={handleTemplateTwoClicked} />
        <Image src={templateThree} className="template-jpeg" onClick={handleTemplateThreeClicked} />
        <Image src={templateFour} className="template-jpeg" onClick={handleTemplateFourClicked} />
      </div>
    </Container>
  )
}
