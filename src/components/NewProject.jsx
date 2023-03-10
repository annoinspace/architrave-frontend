import React, { useState } from "react"
import { Container, Button, Form } from "react-bootstrap"
import { useSelector } from "react-redux"

export default function NewProject() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const colorLibrary = currentUser?.colorLibrary

  const [title, setTitle] = useState("Project Title")
  const [editTitle, setEditTitle] = useState(false)
  const [summary, setSummary] = useState("Here is a section where you can add a project summary")
  const [editSummary, setEditSummary] = useState(false)
  const [currency, setCurrency] = useState(null)
  const [budget, setBudget] = useState(null)
  const [cushion, setCushion] = useState(null)
  const [selectedPalette, setSelectedPalette] = useState(null)
  const [selectedPaletteStyle, setSelectedPaletteStyle] = useState("")

  const incompleteForm = !currency || !budget || !cushion

  const setPalette = (palette) => {
    setSelectedPalette(palette._id)
    setSelectedPaletteStyle("user-palette-wrapper-new-project-selected")
  }

  return (
    <Container className="p-5">
      <div id="create-project-section-one">
        <div className="header-top">
          {editTitle ? (
            <h1 className="text-center title-form-header">
              <Form.Group className="title-form" controlId="title-form">
                <Form.Control
                  type="text"
                  placeholder={title}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                />
              </Form.Group>
              <Button variant="outline-success" onClick={(e) => setEditTitle(false)}>
                Save Title
              </Button>
            </h1>
          ) : (
            <h1 className="text-center cursor-pointer title-form-header" onClick={(e) => setEditTitle(true)}>
              {title}
            </h1>
          )}
          {editSummary ? (
            <div className="text-center mt-3 summary-text">
              <Form.Group className="" controlId="summary-form">
                <Form.Control
                  type="text"
                  placeholder={summary}
                  value={summary}
                  onChange={(e) => {
                    setSummary(e.target.value)
                  }}
                />
              </Form.Group>
              <Button variant="outline-success" onClick={(e) => setEditSummary(false)}>
                Save Summary
              </Button>
            </div>
          ) : (
            <div className="text-center mt-3 cursor-pointer summary-text" onClick={(e) => setEditSummary(true)}>
              {summary}
            </div>
          )}
        </div>
        <div className="mt-5 money-info-wrapper">
          <div>
            <div className="mb-2">Currency</div>
            <Form.Group className="mb-3" controlId="currency-form">
              <Form.Control
                type="text"
                placeholder="Enter currency"
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value)
                }}
              />
            </Form.Group>
          </div>
          <div>
            <div className="mb-2">Budget</div>
            <Form.Group className="mb-3" controlId="budget-form">
              <Form.Control
                type="number"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value)
                }}
              />
              <Form.Text className="text-muted">The main amount you'd like to spend</Form.Text>
            </Form.Group>
          </div>
          <div>
            <div className="mb-2">Cushion</div>
            <Form.Group className="mb-3" controlId="cushion-form">
              <Form.Control
                type="number"
                placeholder="Enter cushion"
                value={cushion}
                onChange={(e) => {
                  setCushion(e.target.value)
                }}
              />
              <Form.Text className="text-muted">This is the money allocated in case you go over budget</Form.Text>
            </Form.Group>
          </div>
        </div>
      </div>

      <div id="initialise-moodboard">
        <div>
          <div>Select products for moodboard</div>
          <div>display products by category or all</div>
        </div>
        <div>
          <div>Select a color palette from your library</div>
          {colorLibrary.map((palette) => (
            <div
              key={palette._id}
              className={palette._id === selectedPalette ? selectedPaletteStyle : "user-palette-wrapper-new-project"}
              onClick={() => setPalette(palette)}
            >
              {palette.colors.map((color) => (
                <div
                  key={color}
                  style={{
                    backgroundColor: color,
                    width: "30px",
                    height: "30px",
                    marginInline: "5px",
                    borderRadius: "50%"
                  }}
                ></div>
              ))}{" "}
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
