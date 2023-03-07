import React, { useState, useEffect } from "react"
import { Button, Form, Modal, Alert } from "react-bootstrap"
import { AiOutlineCloseCircle } from "react-icons/ai"

export default function UploadProducts() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeModal = () => {
    setModalIsOpen(false)
  }
  return (
    <div>
      <Button onClick={() => setModalIsOpen(true)}>Add Product</Button>
      <Modal show={modalIsOpen} onHide={closeModal} id="image-swatch-modal">
        <div className="d-flex justify-content-center mb-5">
          <h2 style={{ flexGrow: 1, marginLeft: "30px" }}>Upload Products</h2>
          <AiOutlineCloseCircle onClick={closeModal} className="icon-button" />
        </div>
        <div>Modal is open</div>
      </Modal>{" "}
    </div>
  )
}
