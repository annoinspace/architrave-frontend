import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, Image, Button, Form } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function ProjectDetails() {
  const { projectId } = useParams()
  const selectedProject = useSelector((state) => state.moodboard.selectedProject)
  const moodboardImage = selectedProject.moodboardImage
  const currency = selectedProject.currency
  const budget = selectedProject.budget
  const cushion = selectedProject.cushion
  const title = selectedProject.title
  const summary = selectedProject.summary
  const products = selectedProject.products

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editQuantity, setEditQuantity] = useState(false)

  const [selectedProductQuantity, setSelectedProductQuantity] = useState(null)

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
    for (let i = 0; i < products.length; i++) {
      total += products[i].price * products[i].quantity
    }
    return total
  }
  let totalAllocated = totalAllocatedCalculator()
  const remaining = budget - totalAllocated

  return (
    <Container className="p-5" id="project-details-container">
      <div id="create-project-section-one">
        <div className="header-top">
          <h1 className="text-center title-form-header">{title}</h1>
          <div className="text-center mt-3 summary-text">{summary}</div>
        </div>
      </div>
      <div id="project-section-two">
        <Image src={moodboardImage} id="moodboard-jpeg" />
        <div className="budget-wrapper-headline">
          <div className="budget-line"></div>
          <div>
            <div>
              Budget {currency}
              {budget}
            </div>
            <div>
              Cushion {currency}
              {cushion ? cushion : 0}
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
        {products.map((product) => (
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
