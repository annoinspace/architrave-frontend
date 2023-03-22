import React, { useState } from "react"
import { Container, Image, Button, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProjectAction } from "../redux/actions/moodboardActions"
export default function ArchivedProject() {
  const { projectId } = useParams()
  const selectedArchiveProject = useSelector((state) => state.moodboard?.selectedArchiveProject)
  const allProducts = selectedArchiveProject?.products
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const currency = currentUser.currency
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [deleteProject, setDeleteProject] = useState(false)
  const [loadingSpinner, setLoadingSpinner] = useState(false)

  const deleteProjecthandler = () => {
    setLoadingSpinner(true)
    dispatch(deleteProjectAction(projectId))
    setTimeout(() => {
      setLoadingSpinner(false)
      navigate("/home")
    }, 2000)
  }

  console.log(selectedArchiveProject)
  return (
    <Container className="p-5" id="project-details-container">
      <div id="project-section-one">
        <div className="header-top">
          <h1 className="text-center title-form-header">{selectedArchiveProject.title}</h1>
          <h5>(archived project)</h5>

          <div className="text-center summary-text">{selectedArchiveProject.summary}</div>
        </div>
      </div>
      <div id="project-section-two">
        <Image src={selectedArchiveProject?.moodboardImage} id="moodboard-jpeg" />

        <div className="budget-wrapper-headline">
          <div className="budget-line"></div>
          <div>
            <div className="d-flex align-items-center justify-content-end m-1">
              Budget {currency}
              {selectedArchiveProject.budget}
            </div>
            <div className="d-flex align-items-center justify-content-end m-1">
              Cushion {currency}
              {selectedArchiveProject.cushion}
            </div>
          </div>
        </div>
      </div>
      <div id="project-section-three">
        <h5>Specified Products</h5>

        {allProducts?.map((product) => (
          <div key={product._id} className="budget-list-item">
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
            Delete Archived Project
          </Button>
        )}
      </div>
    </Container>
  )
}
