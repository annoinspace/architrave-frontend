import React, { useState, useEffect } from "react"
import { Button, Form, Modal, Alert, Image } from "react-bootstrap"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { saveNewProduct, saveNewProductFromImageUpload } from "../redux/actions/userActions"

export default function UploadProducts() {
  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [showDragDrop, setShowDragDrop] = useState(false)
  const [showDeviceUpload, setShowDeviceUpload] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [imageFile, setImageFile] = useState("")
  const [deviceInput, setDeviceInput] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [category, setCategory] = useState("")

  const closeModal = () => {
    setModalIsOpen(false)
    setImage("")
    setPrice("")
    setName("")
    setLink("")
    setCategory("")
    setUrlInput("")
  }

  const showUrlUploadSection = () => {
    setShowUrlInput(true)
    setShowDeviceUpload(false)
  }
  const showFileUploadSection = () => {
    setShowUrlInput(false)
    setShowDeviceUpload(true)
  }

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    const imageUrl = e.target.elements.imageUrl.value.trim()
    if (imageUrl) {
      setImage(imageUrl)
      console.log("imageUrl", imageUrl)
    }
  }

  const submitProductHandler = (e) => {
    const newProduct = {
      name: name,
      price: price,
      link: link,
      category: category,
      image: image
    }
    console.log("newProduct", newProduct)
    dispatch(saveNewProduct(newProduct))
    setImage("")
    setPrice("")
    setName("")
    setLink("")
    setCategory("")
    setUrlInput("")
  }

  const submitProductFromUploadHandler = () => {
    const formData = new FormData()
    formData.append("image", imageFile, "image.jpeg") // add the filename as the third parameter
    formData.append("name", name)
    formData.append("price", price)
    formData.append("link", link)
    formData.append("category", category)

    // const newProduct = {
    //   name: name,
    //   price: price,
    //   link: link,
    //   category: category,
    //   image: formData // pass the FormData object as the value of the image field
    // }
    if (formData) {
      console.log("newProduct", formData)
      dispatch(saveNewProductFromImageUpload(formData))
    }
    setImage("")
    setPrice("")
    setName("")
    setLink("")
    setCategory("")
    setUrlInput("")
    setDeviceInput("")
  }
  const isFormIncomplete = !price || !name || !link || !category

  const saveProductDetails = () => {}

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setImage(URL.createObjectURL(file))
    console.log("file", file)
  }

  return (
    <div>
      <Button onClick={() => setModalIsOpen(true)}>Add Product</Button>
      <Modal show={modalIsOpen} onHide={closeModal} id="image-swatch-modal">
        <div className="d-flex justify-content-center ">
          <h2 style={{ flexGrow: 1, marginLeft: "30px" }}>Upload Products</h2>
          <AiOutlineCloseCircle onClick={closeModal} className="icon-button" />
        </div>
        <div id="upload-product-wrapper">
          <Button onClick={showUrlUploadSection}>enter url</Button>
          <Button>drag and drop</Button>
          <Button onClick={showFileUploadSection}>upload from device</Button>
        </div>
        <div id="image-upload-section">
          <div className="d-flex flex-row justify-content-center">
            {showUrlInput && (
              <>
                <Form onSubmit={(e) => handleUrlSubmit(e)} className="d-flex w-75">
                  <Form.Control
                    type="text"
                    name="imageUrl"
                    value={urlInput}
                    placeholder="Enter image URL"
                    onChange={(e) => {
                      setUrlInput(e.target.value)
                    }}
                    onKeyUp={(e) => e.key === "Enter" && handleUrlSubmit(e)}
                  />
                  <Button type="submit">Add</Button>{" "}
                </Form>
              </>
            )}
            {showDeviceUpload && (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.File
                  name="image"
                  accept="image/jpg, image/jpeg, image/png, image/gif"
                  onChange={(e) => handleImageUpload(e)}
                />
              </Form.Group>
            )}
          </div>
          {image && (
            <div id="product-info">
              <Image id="uploaded-image" src={image} alt="image-upload" />
              <Form onSubmit={saveProductDetails} id="product-details-form">
                <Form.Group className="mb-3" controlId="l">
                  <Form.Label>Product Title*</Form.Label>
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
                  <Form.Label>Product Price*</Form.Label>
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
                  <Form.Label>Product Link*</Form.Label>
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
                  <Form.Label>Product Category*</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                    }}
                  >
                    <option value="">Select Category</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Decor">Decor</option>
                    <option value="Flooring">Flooring</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Living">Living</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Seating">Seating</option>
                    <option value="Soft furnishings">Soft Furnishings</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Wall">Wall</option>
                  </Form.Control>

                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                {urlInput && (
                  <Button variant="primary" disabled={isFormIncomplete} onClick={submitProductHandler}>
                    Submit
                  </Button>
                )}

                {showDeviceUpload && (
                  <Button variant="primary" disabled={isFormIncomplete} onClick={submitProductFromUploadHandler}>
                    Submit 2
                  </Button>
                )}
              </Form>{" "}
            </div>
          )}
        </div>
      </Modal>{" "}
    </div>
  )
}
