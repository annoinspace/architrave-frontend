import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Container, Image, Modal } from "react-bootstrap"
import { FaTrashAlt } from "react-icons/fa"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FiEdit2 } from "react-icons/fi"
import { HiExternalLink } from "react-icons/hi"
import ImageUploadPalette from "./ImageUploadPalette"
import { deleteColorPalette, deleteInspo, deleteProduct } from "../redux/actions/userActions"
import UploadProducts from "./UploadProducts"
import UploadInspoImages from "./UploadInspoImages"

export default function MyLibrary() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const colorPalettes = currentUser?.colorLibrary
  const userProducts = currentUser?.productLibrary
  const userInspo = currentUser?.inspo
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedProduct(null)
  }
  useEffect(() => {
    console.log("colorPalettes", colorPalettes)
    console.log("user inspo", userInspo)
  }, [colorPalettes, userProducts, userInspo])

  const trashClickHandler = (paletteId) => {
    console.log("trash clicked", paletteId)
    dispatch(deleteColorPalette(paletteId))
  }
  const editClickHandler = (palette) => {
    console.log(palette)
  }
  const productClickedHandler = (product) => {
    console.log("product clicked", product._id)
    setSelectedProduct(product)
    setModalIsOpen(true)
  }

  const deleteProductHandler = (productId) => {
    console.log("product to delete", productId)
    dispatch(deleteProduct(productId))
    setModalIsOpen(false)
    setSelectedProduct(null)
  }

  const trashInspoClickHandler = (inspoId) => {
    console.log("inspoId", inspoId)
    dispatch(deleteInspo(inspoId))
  }

  return (
    <Container className="p-5">
      <div className="header-top">
        <h1 className="text-center">My Library</h1>
      </div>
      <div>
        <div>
          <div className="d-flex justify-content-between mt-5">
            <h3>colour palettes</h3>
            <ImageUploadPalette />
          </div>
          {colorPalettes.length === 0 && <div>What are you waiting for? Create your palettes!</div>}
        </div>
        <br />
        <div>
          {colorPalettes &&
            colorPalettes.map((palette) => (
              <div key={palette._id} className="user-palette-wrapper">
                <div className="palette-header">
                  <h5>{palette.paletteName}</h5>
                  <div>
                    {/* <FiEdit2 className="small-icon" onClick={() => editClickHandler(palette)} /> */}
                    <FaTrashAlt className="small-icon" onClick={() => trashClickHandler(palette._id)} />
                  </div>{" "}
                </div>
                <div className="user-palette-wrapper-swatch">
                  {palette.colors.map((color) => (
                    <div
                      key={color}
                      style={{
                        backgroundColor: color,
                        width: "80px",
                        height: "80px",
                        marginInline: "15px",
                        borderRadius: "50%"
                      }}
                    ></div>
                  ))}{" "}
                </div>
              </div>
            ))}
        </div>
        <hr className="library-divider" />
      </div>

      <div>
        <div className="d-flex justify-content-between mt-5">
          <h3>saved products</h3>
          <UploadProducts />
        </div>
        {userProducts.length === 0 && <div>No saved products</div>}
        <div id="all-products-wrapper">
          {userProducts.map((product) => (
            <div key={product._id} className="product-display-list-item" onClick={() => productClickedHandler(product)}>
              <Image src={product.image} className="product-display-list-image" />
              <div className="product-details-wrapper">
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <HiExternalLink className="product-link-icon" />
                </a>
                <div className="product-name">{product.name} </div>
              </div>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <Modal show={modalIsOpen} onHide={closeModal} id="">
            <div className="modal-display-list-header">
              <h2 style={{ flexGrow: 1, marginLeft: "30px", marginRight: "30px" }}>{selectedProduct.name}</h2>
              <AiOutlineCloseCircle onClick={closeModal} className="icon-button close-position" />
            </div>
            <div className="modal-display-list-image-wrapper">
              <Image src={selectedProduct.image} className="modal-display-list-image" />
              <div>Price: {selectedProduct.price}</div>
              <div>Category: {selectedProduct.category}</div>
              <a href={selectedProduct.link} target="_blank" rel="noopener noreferrer" className="no-style">
                <div>
                  Product Link <HiExternalLink className="product-link-icon-modal" />
                </div>{" "}
              </a>
            </div>
            <Button variant="danger" onClick={() => deleteProductHandler(selectedProduct._id)}>
              Delete From Saved Products
            </Button>
          </Modal>
        )}
        <hr className="library-divider" />
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-between">
          <h3>inspo wall</h3>
          <UploadInspoImages />
        </div>
        {userInspo.length === 0 && <div>Your inspo wall is currently empty!</div>}
        <div id="inspo-images-wrapper">
          {userInspo.length > 0 &&
            userInspo.map((image) => (
              <div key={image._id} className="inspo-display-list-item">
                <Image src={image.url} className="inspo-display-list-image" />
                <div className="trash-wrapper">
                  <FaTrashAlt className="small-icon inspo-trash" onClick={() => trashInspoClickHandler(image._id)} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </Container>
  )
}
