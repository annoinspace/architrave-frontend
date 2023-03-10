import React, { useState } from "react"
import { Container, Button, Form } from "react-bootstrap"

export default function NewProject() {
  const [title, setTitle] = useState("Project Title")
  const [editTitle, setEditTitle] = useState(false)
  const [summary, setSummary] = useState("Here is a section where you can add a project summary")
  const [editSummary, setEditSummary] = useState(false)
  const [currency, setCurrency] = useState("")
  const [budget, setBudget] = useState(0)
  const [cushion, setCushion] = useState(0)

  return (
    <Container className="p-5">
      <div className="header-top">
        {editTitle ? (
          <h1 className="text-center">
            <Form.Group className="mb-3" controlId="title-form">
              <Form.Control
                type="text"
                placeholder={title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Button onClick={(e) => setEditTitle(false)}>Save Title</Button>
          </h1>
        ) : (
          <h1 className="text-center cursor-pointer" onClick={(e) => setEditTitle(true)}>
            {title}
          </h1>
        )}
        {editSummary ? (
          <div className="text-center mt-5">
            <Form.Group className="mb-3" controlId="summary-form">
              <Form.Control
                type="text"
                placeholder={summary}
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value)
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Button onClick={(e) => setEditSummary(false)}>Save Summary</Button>
          </div>
        ) : (
          <div className="text-center mt-5 cursor-pointer summary-text" onClick={(e) => setEditSummary(true)}>
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
            <Form.Text className="text-muted"></Form.Text>
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
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
        </div>
        <div>
          <div className="mb-2">Cushion</div>
          <Form.Group className="mb-3" controlId="cushion-form">
            <Form.Control
              type="number"
              placeholder="Enter cushion/extra budget"
              value={cushion}
              onChange={(e) => {
                setCushion(e.target.value)
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
        </div>
      </div>
    </Container>
  )
}
