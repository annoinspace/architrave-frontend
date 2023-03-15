import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Container, Image } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function ProjectDetails() {
  const { projectId } = useParams()
  const selectedProject = useSelector((state) => state.moodboard.selectedProject)
  const moodboardImage = selectedProject.moodboardImage
  const currency = selectedProject.currency
  const budget = selectedProject.budget
  const title = selectedProject.title
  const summary = selectedProject.summary
  const products = selectedProject.products
  const [selectedProduct, setSelectedProduct] = useState(null)

  const selectedProductHandler = (product) => {
    if (selectedProduct === null) {
      setSelectedProduct(product)
    } else {
      setSelectedProduct(null)
    }
  }

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
        <div id="budget-wrapper-headline">
          <div id="budget-line"></div>
          <div>
            Budget {currency}
            {budget}
          </div>
        </div>
      </div>
      <div id="project-section-three">
        <h5>Specified Products</h5>
        {selectedProduct !== null && (
          <div id="selected-budget-item">
            <h6>{selectedProduct.name}</h6>
            <Image src={selectedProduct.image} id="selected-budget-item-image" />
            <div>{selectedProduct.quantity}</div>
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
