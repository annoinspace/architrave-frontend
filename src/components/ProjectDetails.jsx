import React, { useState, useEffect, useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Image, Button, Form, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { toJpeg } from "html-to-image"
import { deleteProjectAction, updateProductQuantity, updateProjectDetails } from "../redux/actions/moodboardActions"

export default function ProjectDetails() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const selectedProject = useSelector((state) => state.moodboard?.selectedProject)
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const currency = currentUser.currency

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

  const dispatch = useDispatch()
  const ref = useRef(null)

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

    console.log("budget", budget, typeof budget)
    console.log("cushion", cushion, typeof cushion)
    console.log("total allocated", totalAllocated, typeof totalAllocated)
    console.log("remaining", remaining, typeof remaining)
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

  const deleteProjecthandler = () => {
    setLoadingSpinner(true)
    dispatch(deleteProjectAction(projectId))
    setTimeout(() => {
      setLoadingSpinner(false)
      navigate("/home")
    }, 2000)
  }

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
          <div id="selected-budget-item">
            <Image src={selectedProduct.image} id="selected-budget-item-image" />
            <div className="w-100">
              <h6>{selectedProduct.name}</h6>
              <div className="budget-line"></div>
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
                  Total Cost: {currency}
                  {selectedTotal}
                </div>
              </div>
              <div className="budget-line"></div>
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
