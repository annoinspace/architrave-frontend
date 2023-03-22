import React, { useState, useEffect, useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Image, Button, Form, Spinner, Modal } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { toJpeg } from "html-to-image"
import {
  addNewProductToProject,
  deleteProductInProject,
  deleteProjectAction,
  updateProductQuantity,
  updateProjectDetails
} from "../redux/actions/moodboardActions"

export default function ProjectDetails() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const selectedProject = useSelector((state) => state.moodboard?.selectedProject)
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const currency = currentUser.currency
  const productLibrary = currentUser.productLibrary

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editQuantity, setEditQuantity] = useState(false)

  const [selectedProductQuantity, setSelectedProductQuantity] = useState(null)
  const [selectedProductPrice, setSelectedProductPrice] = useState(0)
  const [editProject, setEditProject] = useState(false)
  const [allProducts, setAllProducts] = useState(selectedProject?.products)

  const [title, setTitle] = useState(selectedProject?.title)
  const [summary, setSummary] = useState(selectedProject?.summary)
  const [budget, setBudget] = useState(parseFloat(selectedProject?.budget))
  const [totalBudget, setTotalBudget] = useState(selectedProject?.budget)
  const [cushion, setCushion] = useState(selectedProject?.cushion)
  const [totalAllocated, setTotalAllocated] = useState(0)

  const [remaining, setRemaining] = useState(0)

  const [deleteProject, setDeleteProject] = useState(false)
  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [downloadingSpinner, setDownloadingSpinner] = useState(false)

  const [addProductModal, setAddProductModal] = useState(false)

  const [addProducts, setAddProducts] = useState("")

  const dispatch = useDispatch()
  const ref = useRef(null)
  let remainingProducts = productLibrary?.filter((product) => !allProducts.some((p) => p._id === product._id))

  const closeModal = () => {
    setAddProductModal(false)
    setAddProducts("")
  }

  const handleAddProduct = () => {
    setAddProductModal(true)
  }
  const productClickedHandler = (product) => {
    console.log("product clicked", product._id)

    setAddProducts(product)
  }
  const removeFromSelectedProducts = (productId) => {
    // const filtered = addProducts.filter((product) => product._id !== productId)
    setAddProducts("")
  }

  const addMoreProductsHandler = () => {
    const productIdToAdd = addProducts._id
    console.log("addProducts", addProducts)
    console.log("allProducts", allProducts)
    const updated = { ...addProducts, quantity: 1 }
    setAllProducts([...allProducts, updated])
    dispatch(addNewProductToProject(projectId, productIdToAdd))

    updateBudgetInfo()
    closeModal()
  }

  const onMoodboardSave = useCallback(async () => {
    if (ref.current === null) {
      return
    }
    setDownloadingSpinner(true)
    try {
      const dataUrl = await toJpeg(ref.current, { cacheBust: true })

      const link = document.createElement("a")
      link.download = `${title}-moodboard.jpeg`
      link.href = dataUrl
      setDownloadingSpinner(false)
      link.click()
    } catch (err) {
      console.log(err)
    }
  }, [ref])

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
    updateBudgetInfo()
  }

  const selectedProductHandler = (product) => {
    updateBudgetInfo()
    if (selectedProduct === null) {
      setSelectedProduct(product)
      setSelectedProductQuantity(product.quantity)
      setSelectedProductPrice(product.price)
    } else {
      setSelectedProduct(null)
      setSelectedProductQuantity(null)
      setSelectedProductPrice(0)
    }
  }

  const editQuantityHandler = () => {
    setEditQuantity(true)
  }

  const saveQuantityhandler = () => {
    const productId = selectedProduct._id
    const fields = {
      quantity: selectedProductQuantity
    }

    console.log(fields, productId)

    console.log("----products in the save handler--------", allProducts)
    console.log("----product to edit in the save handler--------", productId)

    const updatedProductQuantity = allProducts.map((product) => {
      if (product._id === productId) {
        return { ...product, ...fields }
      }
      return product
    })

    setAllProducts(updatedProductQuantity)

    dispatch(updateProductQuantity(fields, projectId, productId))
    setEditQuantity(false)
  }

  const totalAllocatedCalculator = () => {
    let totalSpent = 0
    for (let i = 0; i < allProducts?.length; i++) {
      totalSpent += allProducts[i].price * allProducts[i].quantity
    }
    return totalSpent
  }

  const selectedTotal = selectedProductPrice * selectedProductQuantity

  const updateBudgetInfo = () => {
    console.log("project updated", selectedProject)
    console.log("all products", allProducts)
    const totalCost = totalAllocatedCalculator()
    setTotalAllocated(parseFloat(totalCost.toFixed(2)))
    setTotalBudget(parseInt(parseFloat(budget) + cushion))
    setRemaining(parseFloat(totalBudget - totalAllocated).toFixed(2))
  }

  const deleteProjecthandler = () => {
    setLoadingSpinner(true)
    dispatch(deleteProjectAction(projectId))
    setTimeout(() => {
      setLoadingSpinner(false)
      navigate("/home")
    }, 2000)
  }

  const deleteProductHandler = () => {
    console.log("selectedProduct._id", selectedProduct._id)
    dispatch(deleteProductInProject(projectId, selectedProduct._id))

    const filteredproducts = allProducts.filter((product) => product._id !== selectedProduct._id)
    setAllProducts(filteredproducts)
    setSelectedProduct(null)
    updateBudgetInfo()
    updateBudgetInfo()
  }

  useEffect(() => {
    console.log("products updated")
    updateBudgetInfo()
  }, [allProducts])

  useEffect(() => {
    console.log("budget info updated")
  }, [editProject, cushion, totalBudget, totalAllocated, remaining])

  useEffect(() => {
    if (totalBudget !== 0) {
      updateBudgetInfo()
      setRemaining((totalBudget - totalAllocated).toFixed(2))
    }
  }, [totalBudget])

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
        <Image src={selectedProject?.moodboardImage} id="moodboard-jpeg" ref={ref} />
        <div className="w-100 download-moodboard-wrapper">
          <Button variant="outline-success" id="download-moodboard" onClick={onMoodboardSave}>
            {downloadingSpinner ? (
              <>
                Preparing File
                <Spinner className="ml-2" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              </>
            ) : (
              <>Download Moodboard</>
            )}
          </Button>
        </div>
        <div className="budget-wrapper-headline">
          <div className="budget-line"></div>
          <div>
            <div className="d-flex align-items-center justify-content-end m-1">
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
            <div className="d-flex align-items-center justify-content-end m-1">
              Cushion {currency}
              {editProject ? (
                <Form.Group className="m-0" controlId="cushion-form">
                  <Form.Control
                    className=""
                    type="number"
                    placeholder={cushion}
                    value={cushion}
                    onChange={(e) => {
                      setCushion(parseInt(e.target.value))
                    }}
                  />
                </Form.Group>
              ) : (
                <>{cushion}</>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-end m-1">
              Total Budget {currency}
              {totalBudget ? totalBudget : 0}
            </div>
            <div className="budget-line-budget"></div>
            <div className="d-flex align-items-center justify-content-end m-1">
              Total Allocated {currency}
              {totalAllocated && totalAllocated}
            </div>
            <div className="d-flex align-items-center justify-content-end m-1">
              Remaining {currency}
              {remaining && remaining}
            </div>
          </div>
        </div>
      </div>
      <div id="project-section-three">
        <h5>Specified Products</h5>
        {selectedProduct !== null && (
          <>
            <div id="selected-budget-item">
              <div>
                <Image src={selectedProduct.image} id="selected-budget-item-image" />
              </div>

              <div className="w-100">
                <h6>{selectedProduct.name}</h6>
                <div className="budget-line selected-budget-item-250 "></div>
                <div id="quantity-price-wrapper">
                  <div id="quantity-wrapper">
                    {" "}
                    Quantity:
                    {editQuantity ? (
                      <>
                        <Form.Group controlId="quantity-form">
                          <Form.Control
                            className="quantity-form"
                            type="number"
                            placeholder={selectedProductQuantity}
                            value={selectedProductQuantity}
                            onChange={(e) => {
                              setSelectedProductQuantity(e.target.value)
                            }}
                          />
                        </Form.Group>
                        <Button variant="outline-success" onClick={saveQuantityhandler}>
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <span>{selectedProductQuantity}</span>
                        <Button variant="outline-success" onClick={editQuantityHandler}>
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                  <div id="total-cost-selected">
                    <div>
                      Single Product: {currency}
                      {selectedProduct.price}
                    </div>
                    <div>
                      Total Cost: {currency}
                      {selectedTotal}
                    </div>
                  </div>
                </div>
                <div className="budget-line selected-budget-item-250 "></div>
              </div>
            </div>
            <div className="delete-product-button-wrapper">
              <Button variant="outline-danger" onClick={deleteProductHandler}>
                Delete Product
              </Button>
            </div>
          </>
        )}
        {allProducts?.map((product) => (
          <div key={product._id} className="budget-list-item" onClick={() => selectedProductHandler(product)}>
            <div className="budget-list-product-image-wrapper">
              <Image src={product.image} className="budget-list-product-image" />
            </div>

            <h6>{product.name}</h6>
            <div className="product-price">
              {currency}
              {product.price}
              <div>{product.quantity}</div>
            </div>
          </div>
        ))}
        <Button id="create-project-button" style={{ alignSelf: "center" }} onClick={handleAddProduct}>
          + Add Product
        </Button>
      </div>
      {addProductModal && (
        <Modal show={addProductModal} onHide={closeModal} id="add-product-modal">
          <div className="modal-display-list-header">
            <h4 style={{ flexGrow: 1, marginLeft: "30px", marginRight: "30px" }}>More Products from your Library</h4>
            <AiOutlineCloseCircle onClick={closeModal} className="icon-button close-position" />
          </div>
          <div id="more-products-wrapper-modal">
            {remainingProducts?.map((product) => (
              <div
                key={product._id}
                className="product-display-list-item-more"
                onClick={() => productClickedHandler(product)}
              >
                <Image src={product.image} className="product-display-list-more-image" />
                <div className="product-details-wrapper">
                  <div className="product-name">{product.name} </div>
                </div>
              </div>
            ))}

            <div className="budget-line w-100"></div>
            <div id="more-products-selected">
              {addProducts && (
                <div
                  key={addProducts._id}
                  className="product-display-list-item"
                  onClick={() => removeFromSelectedProducts(addProducts._id)}
                >
                  <Image src={addProducts.image} className="product-display-list-image" />
                  <div className="product-details-wrapper">
                    <div className="product-name">{addProducts.name} </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <Button variant="outline-success" onClick={addMoreProductsHandler}>
              Add Product
            </Button>
          </div>
        </Modal>
      )}
      <div id="project-section-four">
        <h5>Contractors & Services</h5>
      </div>
      <div id="edit-button">
        {deleteProject ? (
          <>
            <Button variant="secondary" onClick={() => setDeleteProject(false)}>
              Cancel{" "}
            </Button>
            <Button variant="danger" onClick={deleteProjecthandler} className="ml-2">
              {loadingSpinner ? (
                <>
                  Deleting
                  <Spinner className="ml-2" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </>
        ) : (
          <Button variant="danger" onClick={() => setDeleteProject(true)}>
            Delete Project
          </Button>
        )}
      </div>
    </Container>
  )
}
