import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Image, Button, Form } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { updateProjectDetails } from "../redux/actions/moodboardActions"

export default function ProjectDetails() {
  const { projectId } = useParams()
  const selectedProject = useSelector((state) => state.moodboard?.selectedProject)

  const currency = selectedProject?.currency

  const allProducts = selectedProject?.products

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editQuantity, setEditQuantity] = useState(false)

  const [selectedProductQuantity, setSelectedProductQuantity] = useState(null)
  const [editProject, setEditProject] = useState(false)

  const [title, setTitle] = useState(selectedProject?.title)
  const [summary, setSummary] = useState(selectedProject?.summary)
  const [budget, setBudget] = useState(selectedProject?.budget)
  const [cushion, setCushion] = useState(selectedProject?.cushion)

  const dispatch = useDispatch()

  const enableEditHandler = () => {
    setEditProject(true)
  }
  const saveChangesHandler = () => {
    setEditProject(false)

    const fields = {
      title: title,
      summary: summary,
      budget: budget,
      cushion: cushion
    }
    console.log(fields)
    dispatch(updateProjectDetails(fields, projectId))
  }

  const selectedProductHandler = (product) => {
    if (selectedProduct === null) {
      setSelectedProduct(product)
      setSelectedProductQuantity(product.quantity)
    } else {
      setSelectedProduct(null)
      setSelectedProductQuantity(null)
    }
  }

  const editQuantityHandler = () => {
    setEditQuantity(true)
  }
  const totalAllocatedCalculator = () => {
    let total = 0
    for (let i = 0; i < allProducts?.length; i++) {
      total += allProducts[i].price * allProducts[i].quantity
    }
    return total
  }
  let totalAllocated = totalAllocatedCalculator()
  const remaining = budget - totalAllocated

  return (
    <Container className="p-5" id="project-details-container">
      <div id="edit-button">
        {editProject === false ? (
          <Button variant="outline-success" onClick={enableEditHandler}>
            Enable Edit
          </Button>
        ) : (
          <Button variant="outline-success" onClick={saveChangesHandler}>
            Save Changes
          </Button>
        )}
      </div>
      <div id="project-section-one">
        <div className="header-top">
          {editProject ? (
            <Form.Group className="" controlId="title-form">
              <Form.Control
                className="text-center title-form-header"
                type="text"
                placeholder={title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </Form.Group>
          ) : (
            <h1 className="text-center title-form-header">{title}</h1>
          )}
          {editProject ? (
            <Form.Group className="" controlId="summary-form">
              <Form.Control
                className="text-center summary-text"
                type="text"
                placeholder={summary}
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value)
                }}
              />
            </Form.Group>
          ) : (
            <div className="text-center summary-text">{summary}</div>
          )}
        </div>
      </div>
      <div id="project-section-two">
        <Image src={selectedProject?.moodboardImage} id="moodboard-jpeg" />
        <div className="budget-wrapper-headline">
          <div className="budget-line"></div>
          <div>
            <div className="d-flex align-items-center m-1">
              Budget {currency}
              {editProject ? (
                <Form.Group className="m-0" controlId="budget-form">
                  <Form.Control
                    className=""
                    type="number"
                    placeholder={budget}
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value)
                    }}
                  />
                </Form.Group>
              ) : (
                <>{budget}</>
              )}
            </div>
            <div className="d-flex align-items-center m-1">
              Cushion {currency}
              {editProject ? (
                <Form.Group className="m-0" controlId="cushion-form">
                  <Form.Control
                    className=""
                    type="number"
                    placeholder={cushion}
                    value={cushion}
                    onChange={(e) => {
                      setCushion(e.target.value)
                    }}
                  />
                </Form.Group>
              ) : (
                <>{cushion}</>
              )}
            </div>
            <div>
              Total Allocated {currency}
              {totalAllocated ? totalAllocated : 0}
            </div>
            <div>
              Remaining {currency}
              {remaining && remaining}
            </div>
          </div>
        </div>
      </div>
      <div id="project-section-three">
        <h5>Specified Products</h5>
        {selectedProduct !== null && (
          <div id="selected-budget-item">
            <Image src={selectedProduct.image} id="selected-budget-item-image" />
            <div>
              <h6>{selectedProduct.name}</h6>
              <div>
                {editQuantity ? (
                  <Form.Group className="title-form" controlId="title-form">
                    <Form.Control
                      type="text"
                      placeholder={selectedProductQuantity}
                      value={selectedProductQuantity}
                      onChange={(e) => {
                        setSelectedProductQuantity(e.target.value)
                      }}
                    />
                    <Button variant="outline-success" onClick={(e) => setEditQuantity(false)}>
                      Save Quantity
                    </Button>
                  </Form.Group>
                ) : (
                  <>
                    Quantity:{selectedProductQuantity}
                    <Button onClick={editQuantityHandler}>Edit Quantity</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {allProducts?.map((product) => (
          <div key={product._id} className="budget-list-item" onClick={() => selectedProductHandler(product)}>
            <h6>{product.name}</h6>
            <div className="product-price">
              {currency}
              {product.price}
              <div>{product.quantity}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
