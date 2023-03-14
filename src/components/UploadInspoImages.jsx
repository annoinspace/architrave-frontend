import React, { useState, useEffect } from "react"
import { Button, Modal, Image, Alert } from "react-bootstrap"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { saveInspoImagesFromDragDrop } from "../redux/actions/userActions"

export default function UploadInspoImages() {
  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [alert, setAlert] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
    setImages([])
    setImageFiles([])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    console.log("dropped image", e.target.value)
    const dropped = e.target.value
    console.log(typeof dropped)
    if (imageFiles.length === 5) {
      return
    }

    const file = e.dataTransfer.files[0]
    if (file) {
      setImageFiles([...imageFiles, file])
    }
    if (file.type.split("/")[0] === "image") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imgData = e.target.result
        setImages([...images, imgData])
      }
      reader.readAsDataURL(file)
    } else {
      console.log("Invalid file type. Please drop an image file.")
    }
  }
  const handleDragOver = (e) => {
    e.preventDefault()
  }
  const handleImageClick = (index) => {
    console.log("selected image is an", typeof selectedImage)
  }

  useEffect(() => {
    console.log("image files", imageFiles)
    if (imageFiles.length === 5) {
      setAlert(true)
    } else {
      setAlert(false)
    }
  }, [imageFiles])

  const saveDragDropHandler = () => {
    const formData = new FormData()
    imageFiles.forEach((file) => {
      formData.append("image", file)
    })
    if (formData) {
      dispatch(saveInspoImagesFromDragDrop(formData))
      console.log("form data send from drag drop")
    }
    setImages([])
    setImageFiles([])
  }

  return (
    <div>
      <Button style={{ backgroundColor: "rgb(132, 112, 112)", border: "none" }} onClick={() => setModalIsOpen(true)}>
        Upload Images
      </Button>
      <Modal show={modalIsOpen} onHide={closeModal} id="inspo-upload-modal">
        <div id="swatch-modal-inner-wrapper">
          <AiOutlineCloseCircle onClick={closeModal} className="icon-button" />
          <div className="d-flex flex-column text-center justify-content-center align-items-center mb-3">
            <h2 style={{ flexGrow: 1, marginLeft: "30px" }}>Let's add some inspo!</h2>
            <p>Grab your interior inspo and fill your wall, it helps to bring your vision to life!</p>
            <p>Drop and upload up to 5 images at a time in the section below.</p>
            {alert && (
              <Alert variant="warning" style={{ width: "250px", float: "center" }}>
                Maximum images reached
              </Alert>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{ width: "500px", height: "350px", border: "1px solid black" }}
            >
              {images.map((imgSrc, index) => (
                <Image
                  key={index}
                  src={imgSrc}
                  alt={`${index + 1}`}
                  style={{ maxHeight: "150px", objectFit: "cover", margin: "10px" }}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>{" "}
          <Button variant="outline-success" onClick={saveDragDropHandler}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}
