import React, { useEffect, useState } from "react"
import { Container, Button, Form, Image, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  initialiseNewProject,
  saveBudgetAction,
  saveCurrencyAction,
  saveCushionAction,
  saveProductsForMoodboard,
  saveSelectedColorPalette,
  saveSummaryAction,
  saveTitleAction
} from "../redux/actions/moodboardActions"
import { useNavigate } from "react-router-dom"

export default function NewProject() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const productLibrary = currentUser?.productLibrary
  const colorLibrary = currentUser?.colorLibrary
  const initialisedProject = useSelector((state) => state.moodboard.initialisedProject)

  const [title, setTitle] = useState("Project Title*")
  const [editTitle, setEditTitle] = useState(false)
  const [summary, setSummary] = useState("add project summary*")
  const [editSummary, setEditSummary] = useState(false)
  const [currency, setCurrency] = useState("")
  const [budget, setBudget] = useState("")
  const [cushion, setCushion] = useState("")
  const [selectedPalette, setSelectedPalette] = useState("")
  const [fullPalette, setFullPalette] = useState("")
  const [selectedPaletteStyle, setSelectedPaletteStyle] = useState("")
  const [createMoodboardStartText, setCreateMoodboardStartText] = useState("")

  const [selectedProducts, setSelectedProducts] = useState([])

  const [showSpinner, setShowSpinner] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const setPalette = (palette) => {
    setSelectedPalette(palette._id)
    setSelectedPaletteStyle("user-palette-wrapper-new-project-selected")

    setFullPalette(palette)
  }

  const setSelectedProductsHandler = (product) => {
    // checking if the product is on the list already
    if (!selectedProducts.includes(product)) {
      if (selectedProducts.length === 12) {
        return // do not add more products if there are already 12
      }
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const removeProductHandler = (productId) => {
    console.log("product to remove", productId)
    const filtered = selectedProducts.filter((allproducts) => allproducts._id !== productId)
    console.log(filtered)
    setSelectedProducts(filtered)
  }

  useEffect(() => {
    console.log("selected products", selectedProducts)
    if (!selectedPalette) {
      setCreateMoodboardStartText("Select a color palette to continue ...")
    } else {
      setCreateMoodboardStartText("Let's create your moodboard!")
    }
  }, [selectedProducts, selectedPalette])

  useEffect(() => {
    console.log("title", title)
  }, [title])

  const saveSelectedProducts = () => {
    if (!title || !budget || !currency || !summary || !cushion) {
      setCreateMoodboardStartText("please fill in the mandatory fields")
    } else {
      setShowSpinner(true)

      const newProject = {
        title: title,
        summary: summary,
        currency: currency,
        budget: budget,
        cushion: cushion,
        products: selectedProducts,
        palette: fullPalette
      }

      console.log("-----newProject", newProject)
      dispatch(saveProductsForMoodboard(selectedProducts))
      dispatch(saveSelectedColorPalette(fullPalette))
      dispatch(saveTitleAction(title))
      dispatch(saveSummaryAction(summary))
      dispatch(saveCurrencyAction(currency))
      dispatch(saveBudgetAction(budget))
      dispatch(saveCushionAction(cushion))
      dispatch(initialiseNewProject(newProject))

      setTimeout(() => {
        setSelectedProducts([])
        setSelectedPalette("")
        setFullPalette("")
        setSelectedPaletteStyle("")
        setShowSpinner(false)
        navigate("/new-moodboard")
      }, 2000)
    }
  }

  return (
    <Container className="p-5">
      <div id="create-project-section-one">
        <div className="header-top">
          {editTitle ? (
            <h1 className="text-center title-form-header">
              <Form.Group className="title-form" controlId="title-form">
                <Form.Control
                  type="text"
                  placeholder={title}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                />
              </Form.Group>
              <Button variant="outline-success" onClick={(e) => setEditTitle(false)}>
                Save Title
              </Button>
            </h1>
          ) : (
            <h1 className="text-center cursor-pointer title-form-header" onClick={(e) => setEditTitle(true)}>
              {title}
            </h1>
          )}
          {editSummary ? (
            <div className="text-center mt-3 summary-text">
              <Form.Group className="" controlId="summary-form">
                <Form.Control
                  type="text"
                  placeholder={summary}
                  value={summary}
                  onChange={(e) => {
                    setSummary(e.target.value)
                  }}
                />
              </Form.Group>
              <Button variant="outline-success" onClick={(e) => setEditSummary(false)}>
                Save Summary
              </Button>
            </div>
          ) : (
            <div className="text-center mt-3 cursor-pointer summary-text" onClick={(e) => setEditSummary(true)}>
              {summary}
            </div>
          )}
        </div>
        <div className="mt-5 money-info-wrapper">
          <div>
            <div className="mb-2">Currency*</div>
            <Form.Group className="mb-3" controlId="currency-form">
              <Form.Control
                type="text"
                placeholder="Enter currency symbol"
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value)
                }}
              />
            </Form.Group>
          </div>
          <div>
            <div className="mb-2">Budget*</div>
            <Form.Group className="mb-3" controlId="budget-form-new">
              <Form.Control
                type="number"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value)
                }}
              />
              <Form.Text className="text-muted">The main amount you'd like to spend</Form.Text>
            </Form.Group>
          </div>
          <div>
            <div className="mb-2">Cushion*</div>
            <Form.Group className="mb-3" controlId="cushion-form-new">
              <Form.Control
                type="number"
                placeholder="Enter cushion"
                value={cushion}
                onChange={(e) => {
                  setCushion(e.target.value)
                }}
              />
              <Form.Text className="text-muted">This is the money allocated in case you go over budget</Form.Text>
            </Form.Group>
            <p>* mandatory fields</p>
          </div>
        </div>
      </div>

      <div id="initialise-moodboard">
        <div id="new-project-images-wrapper">
          <h6>Select up to 12 products to create your moodboard</h6>
          <p>(you can add more products to your shopping list later)</p>
          <div className="all-products-new-project">
            {productLibrary.map((product) => (
              <div
                key={product._id}
                className="single-product-new-project"
                onClick={() => setSelectedProductsHandler(product)}
              >
                <Image src={product.image} className="single-product-new-project-image" />
              </div>
            ))}
          </div>
        </div>
        <div id="new-project-swatch-wrapper">
          <h6 className="text-right mr-4">Select a color palette from your library</h6>
          <div id="swatches-wrapper-scroll">
            {colorLibrary.map((palette) => (
              <div
                key={palette._id}
                className={palette._id === selectedPalette ? selectedPaletteStyle : "user-palette-wrapper-new-project"}
                onClick={() => setPalette(palette)}
              >
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    style={{
                      backgroundColor: color,
                      width: "30px",
                      height: "30px",
                      marginInline: "5px",
                      borderRadius: "50%"
                    }}
                  ></div>
                ))}{" "}
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
      {selectedProducts.length > 0 && (
        <>
          <div id="start-moodboard">
            <h6>{createMoodboardStartText}</h6>
            {selectedPalette && (
              <Button style={{ backgroundColor: "rgb(132, 112, 112)", border: "none" }} onClick={saveSelectedProducts}>
                Create Moodboard
                {showSpinner && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
              </Button>
            )}
          </div>
          <div id="selected-wrapper">
            {selectedProducts.map((product) => (
              <div key={product._id} onClick={(e) => removeProductHandler(product._id)}>
                <Image src={product.image} className="single-product-selected" />
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  )
}
