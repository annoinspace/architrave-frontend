import React, { useState, useEffect } from "react"
import { Button, Form, Modal, Alert, Image } from "react-bootstrap"
import { AiOutlineCloseCircle } from "react-icons/ai"

export default function UploadProducts() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [showDragDrop, setShowDragDrop] = useState(false)
  const [showDeviceUpload, setShowDeviceUpload] = useState(false)
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(null)
  const [name, setName] = useState(null)
  const [link, setLink] = useState(null)
  const [category, setCategory] = useState(null)

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const showUrlUploadSection = () => {
    setShowUrlInput(true)
  }

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    const imageUrl = e.target.elements.imageUrl.value.trim()
    if (imageUrl) {
      setImage(imageUrl)
      console.log("imageUrl", imageUrl)
    }
  }

  const submitProductHandler = () => {
    const newProduct = {
      name: name,
      price: price,
      link: link,
      category: category,
      image: image
    }
    console.log("newProduct", newProduct)
    setImage("")
    setPrice(null)
    setName(null)
    setLink(null)
    setCategory(null)
  }
  const isFormIncomplete = !price || !name || !link || !category

  const saveProductDetails = () => {}
  return (
    <div>
      <Button onClick={() => setModalIsOpen(true)}>Add Product</Button>
      <Modal show={modalIsOpen} onHide={closeModal} id="image-swatch-modal">
        <div className="d-flex justify-content-center mb-5">
          <h2 style={{ flexGrow: 1, marginLeft: "30px" }}>Upload Products</h2>
          <AiOutlineCloseCircle onClick={closeModal} className="icon-button" />
        </div>
        <div id="upload-product-wrapper">
          <Button onClick={showUrlUploadSection}>enter url</Button>
          <Button>drag and drop</Button>
          <Button>upload from device</Button>
        </div>
        <div id="image-upload-section">
          <div className="d-flex flex-row justify-content-center">
            {showUrlInput && (
              <>
                <Form onSubmit={(e) => handleUrlSubmit(e)} className="d-flex w-75">
                  <Form.Control
                    type="text"
                    name="imageUrl"
                    placeholder="Enter image URL"
                    onKeyUp={(e) => e.key === "Enter" && handleUrlSubmit(e)}
                  />
                  <Button type="submit">Add</Button>{" "}
                </Form>
              </>
            )}
          </div>
          {image && (
            <div id="product-info">
              <Image id="uploaded-image" src={image} alt="image-upload" />
              <Form onSubmit={saveProductDetails} id="product-details-form">
                <Form.Group className="mb-3" controlId="l">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="l">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value)
                    }}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="l">
                  <Form.Label>Product Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product link"
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value)
                    }}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="l">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                    }}
                  >
                    <option value="">Select Category</option>
                    <option value="wall">Wall</option>
                    <option value="textiles">Textiles</option>
                    <option value="flooring">Flooring</option>
                    <option value="lighting">Lighting</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="living">Living</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="soft furnishings">Soft Furnishings</option>
                    <option value="decorative">Decor & Accessories</option>
                  </Form.Control>

                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Button variant="primary" disabled={isFormIncomplete} onClick={submitProductHandler}>
                  Submit
                </Button>
              </Form>{" "}
            </div>
          )}
        </div>
      </Modal>{" "}
    </div>
  )
}
