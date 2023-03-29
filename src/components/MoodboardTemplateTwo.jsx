import "../styles/MoodboardOne.css"
import React, { useState, useRef, useCallback } from "react"
import { Image, Button, Spinner, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { toJpeg } from "html-to-image"
import { useNavigate } from "react-router-dom"
import { HiOutlineCheck } from "react-icons/hi"
import { addMoodboardImage, getAllUserProjects } from "../redux/actions/moodboardActions"

export default function MoodboardTemplateOne() {
  const initialisedProject = useSelector((state) => state.moodboard.initialisedProject)
  const projectId = initialisedProject?._id
  console.log("-------id in projectId---------", projectId)

  const products = useSelector((state) => state.moodboard.initialisedProject?.products)
  const palette = initialisedProject.palette?.colors
  const inspo = useSelector((state) => state.currentUser.currentUser.inspo)

  const [draggedProduct1, setDraggedProduct1] = useState(null)
  const [draggedProduct2, setDraggedProduct2] = useState(null)
  const [draggedProduct3, setDraggedProduct3] = useState(null)
  const [draggedProduct4, setDraggedProduct4] = useState(null)
  const [draggedProduct5, setDraggedProduct5] = useState(null)
  const [draggedProduct6, setDraggedProduct6] = useState(null)
  const [draggedProduct7, setDraggedProduct7] = useState(null)
  const [draggedProduct8, setDraggedProduct8] = useState(null)
  const [draggedProduct9, setDraggedProduct9] = useState(null)
  const [draggedProduct10, setDraggedProduct10] = useState(null)
  const [draggedProduct11, setDraggedProduct11] = useState(null)
  const [draggedProduct12, setDraggedProduct12] = useState(null)

  const [moodboardTextFieldOne, setmoodboardTextFieldOne] = useState("Aspirational Text")
  const [editText1, setEditText1] = useState(true)
  const [moodboardTextFieldTwo, setmoodboardTextFieldTwo] = useState("Edit Me!")
  const [editText2, setEditText2] = useState(true)
  const [moodboardTextFieldThree, setmoodboardTextFieldThree] = useState("More Text")
  const [editText3, setEditText3] = useState(true)
  const [moodboardTextFieldFour, setmoodboardTextFieldFour] = useState("Happy Days!")
  const [editText4, setEditText4] = useState(true)
  const [imageShadow, setImageShadow] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [textColor, setTextColor] = useState("#000000")
  const [swatchStyle, setSwatchStyle] = useState("swatch-square")
  const [swatchShadow, setSwatchShadow] = useState(false)
  const [border, setBorder] = useState(true)

  const [showSpinner, setShowSpinner] = useState(false)

  const ref = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const borderHandlerOn = () => {
    setBorder(true)
  }
  const borderHandlerOff = () => {
    setBorder(false)
  }
  const swatchShadowOn = () => {
    setSwatchShadow(true)
  }
  const swatchShadowOff = () => {
    setSwatchShadow(false)
  }
  const imageBorderHandlerOn = () => {
    setImageShadow(true)
  }
  const imageBorderHandlerOff = () => {
    setImageShadow(false)
  }

  const handleDrop = (e, imageIndex) => {
    e.preventDefault()
    const data = e.dataTransfer.getData("text/plain")
    const [productId, productImage] = data.split(",")
    console.log("product._id", productId)
    console.log("product.image", productImage)
    switch (imageIndex) {
      case 1:
        setDraggedProduct1(productImage)
        break
      case 2:
        setDraggedProduct2(productImage)
        break
      case 3:
        setDraggedProduct3(productImage)
        break
      case 4:
        setDraggedProduct4(productImage)
        break
      case 5:
        setDraggedProduct5(productImage)
        break
      case 6:
        setDraggedProduct6(productImage)
        break
      case 7:
        setDraggedProduct7(productImage)
        break
      case 8:
        setDraggedProduct8(productImage)
        break
      case 9:
        setDraggedProduct9(productImage)
        break
      case 10:
        setDraggedProduct10(productImage)
        break
      case 11:
        setDraggedProduct11(productImage)
        break
      case 12:
        setDraggedProduct12(productImage)
        break
      default:
        break
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const squareSwatches = () => {
    setSwatchStyle("swatch-square")
  }
  const circleSwatches = () => {
    setSwatchStyle("swatch-circle")
  }
  const strokeSwatches = () => {
    setSwatchStyle("swatch-stroke")
  }
  const rectangleSwatches = () => {
    setSwatchStyle("swatch-rectangle")
  }
  const pillSwatches = () => {
    setSwatchStyle("swatch-pill")
  }
  const archSwatches = () => {
    setSwatchStyle("swatch-arch")
  }

  const handleBackgroundColor = (e) => {
    setBackgroundColor(e.target.value)
  }
  const handleTextColor = (e) => {
    setTextColor(e.target.value)
  }

  const handleMoodboardSave = useCallback(async () => {
    if (ref.current === null) {
      return
    }
    setShowSpinner(true)

    try {
      const dataUrl = await toJpeg(ref.current, { quality: 1.0, cacheBust: true })
      console.log("dataUrl", dataUrl)
      const blob = await fetch(dataUrl).then((res) => res.blob())

      const formData = new FormData()
      formData.append("moodboard", blob, "moodboard.jpeg")
      console.log("form data file", formData.get("moodboard"))

      if (formData) {
        dispatch(addMoodboardImage(formData, projectId))
        setTimeout(() => {
          setShowSpinner(false)
          dispatch(getAllUserProjects())
          navigate(`/home`)
        }, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }, [ref])

  return (
    <div id="moodboard-background">
      <div
        ref={ref}
        id="moodboard-section"
        style={{
          backgroundColor: `${backgroundColor}`
        }}
      >
        <div id="moodboard-swatches-2">
          {palette &&
            palette.map((color, index) => (
              <div
                key={index}
                className={swatchStyle}
                style={{
                  backgroundColor: `${color}`,
                  boxShadow: swatchShadow ? "2px 2px 4px rgba(0,0,0,0.4)" : "none"
                }}
              ></div>
            ))}
        </div>
        <div id="aspirational-wrapper">
          <div className="aspirational-text">
            {!editText1 && (
              <div onClick={() => setEditText1(true)} style={{ color: textColor }}>
                {moodboardTextFieldOne}
              </div>
            )}
            {editText1 && (
              <div className="aspirational-text-tick">
                <Form.Group className="aspirational-text-form" controlId="">
                  <Form.Control
                    className=""
                    type="text"
                    placeholder={moodboardTextFieldOne}
                    value={moodboardTextFieldOne}
                    onChange={(e) => {
                      setmoodboardTextFieldOne(e.target.value)
                    }}
                  />
                </Form.Group>
                <HiOutlineCheck className="small-icon-inspo tick" onClick={() => setEditText1(false)} />
              </div>
            )}
          </div>
          <div className="budget-line w-100 mt-0"></div>
          <div className="aspirational-text">
            {!editText2 && (
              <div onClick={() => setEditText2(true)} style={{ color: textColor }}>
                {moodboardTextFieldTwo}
              </div>
            )}
            {editText2 && (
              <div className="aspirational-text-tick">
                <Form.Group className="aspirational-text-form" controlId="">
                  <Form.Control
                    className=""
                    type="text"
                    placeholder={moodboardTextFieldTwo}
                    value={moodboardTextFieldTwo}
                    onChange={(e) => {
                      setmoodboardTextFieldTwo(e.target.value)
                    }}
                  />
                </Form.Group>
                <HiOutlineCheck className="small-icon-inspo tick" onClick={() => setEditText2(false)} />
              </div>
            )}
          </div>
          <div className="budget-line w-100 mt-0"></div>
          <div className="aspirational-text">
            {!editText3 && (
              <div onClick={() => setEditText3(true)} style={{ color: textColor }}>
                {moodboardTextFieldThree}
              </div>
            )}
            {editText3 && (
              <div className="aspirational-text-tick">
                <Form.Group className="aspirational-text-form" controlId="">
                  <Form.Control
                    className=""
                    type="text"
                    placeholder={moodboardTextFieldThree}
                    value={moodboardTextFieldThree}
                    onChange={(e) => {
                      setmoodboardTextFieldThree(e.target.value)
                    }}
                  />
                </Form.Group>
                <HiOutlineCheck className="small-icon-inspo tick" onClick={() => setEditText3(false)} />
              </div>
            )}
          </div>
          <div className="budget-line w-100 mt-0"></div>
          <div className="aspirational-text">
            {!editText4 && (
              <div onClick={() => setEditText4(true)} style={{ color: textColor }}>
                {moodboardTextFieldFour}
              </div>
            )}
            {editText4 && (
              <div className="aspirational-text-tick">
                <Form.Group className="aspirational-text-form" controlId="">
                  <Form.Control
                    className=""
                    type="text"
                    placeholder={moodboardTextFieldFour}
                    value={moodboardTextFieldFour}
                    onChange={(e) => {
                      setmoodboardTextFieldFour(e.target.value)
                    }}
                  />
                </Form.Group>
                <HiOutlineCheck className="small-icon-inspo tick" onClick={() => setEditText4(false)} />
              </div>
            )}
          </div>
        </div>
        <div
          id="template-2-image-1"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 1)}
          onDragOver={handleDragOver}
        >
          {draggedProduct1 && <Image src={draggedProduct1} id="template-2-image-1-image" />}
        </div>
        <div
          id="template-2-image-2"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 2)}
          onDragOver={handleDragOver}
        >
          {draggedProduct2 && <Image src={draggedProduct2} id="template-2-image-2-image" />}
        </div>
        <div
          id="template-2-image-3"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 3)}
          onDragOver={handleDragOver}
        >
          {draggedProduct3 && <Image src={draggedProduct3} id="template-2-image-3-image" />}
        </div>
        <div
          id="template-2-image-4"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 4)}
          onDragOver={handleDragOver}
        >
          {draggedProduct4 && <Image src={draggedProduct4} id="template-2-image-4-image" />}
        </div>
        <div
          id="template-2-image-5"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 5)}
          onDragOver={handleDragOver}
        >
          {draggedProduct5 && <Image src={draggedProduct5} id="template-2-image-5-image" />}
        </div>
        <div
          id="template-2-image-6"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 6)}
          onDragOver={handleDragOver}
        >
          {draggedProduct6 && <Image src={draggedProduct6} id="template-2-image-6-image" />}
        </div>
        <div
          id="template-2-image-7"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 7)}
          onDragOver={handleDragOver}
        >
          {draggedProduct7 && <Image src={draggedProduct7} id="template-2-image-7-image" />}
        </div>
        <div
          id="template-2-image-8"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 8)}
          onDragOver={handleDragOver}
        >
          {draggedProduct8 && <Image src={draggedProduct8} id="template-2-image-8-image" />}
        </div>
        <div
          id="template-2-image-9"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 9)}
          onDragOver={handleDragOver}
        >
          {draggedProduct9 && <Image src={draggedProduct9} id="template-2-image-9-image" />}
        </div>
        <div
          id="template-2-image-10"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 10)}
          onDragOver={handleDragOver}
        >
          {draggedProduct10 && <Image src={draggedProduct10} id="template-2-image-10-image" />}
        </div>
        <div
          id="template-2-image-11"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 11)}
          onDragOver={handleDragOver}
        >
          {draggedProduct11 && <Image src={draggedProduct11} id="template-2-image-11-image" />}
        </div>
        <div
          id="template-2-image-12"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 12)}
          onDragOver={handleDragOver}
        >
          {draggedProduct12 && <Image src={draggedProduct12} id="template-2-image-12-image" />}
        </div>
      </div>
      <div id="available-images-wrapper">
        <div id="available-images-inner">
          <p>Selected Products</p>
          {products &&
            products.map((product) => (
              <div
                className="available-images"
                key={product._id}
                draggable="true"
                onDragStart={(e) => {
                  const data = `${product._id},${product.image}`
                  e.dataTransfer.setData("text/plain", data)
                }}
              >
                <Image src={product.image} className="available-images-image" />
              </div>
            ))}
          <hr />
          <p>More Images</p>
          {inspo.map((image) => (
            <div
              className="available-images"
              key={image._id}
              draggable="true"
              onDragStart={(e) => {
                const data = `${image._id},${image.url}`
                e.dataTransfer.setData("text/plain", data)
              }}
            >
              <Image src={image.url} className="available-images-image" />
            </div>
          ))}
        </div>
      </div>
      <div id="moodboard-settings-section">
        <div id="moodboard-settings-section-inner">
          <h6>Settings</h6>
          <div>
            <p>Swatch Style</p>
            <div className="buttons-wrapper">
              <div className="jump-library mt-0" onClick={squareSwatches}>
                Square
              </div>
              <div className="jump-library mt-0" onClick={circleSwatches}>
                Circle
              </div>
              <div className="jump-library mt-0" onClick={rectangleSwatches}>
                Rectangle
              </div>
              <div className="jump-library mt-0" onClick={strokeSwatches}>
                Stroke
              </div>
              <div className="jump-library mt-0" onClick={archSwatches}>
                Arch
              </div>
              <div className="jump-library mt-0" onClick={pillSwatches}>
                Pill
              </div>
            </div>

            <p>Swatch Shadows</p>
            <div className="buttons-wrapper">
              <div className="jump-library mt-0" onClick={swatchShadowOn}>
                On
              </div>
              <div className="jump-library mt-0" onClick={swatchShadowOff}>
                Off
              </div>
            </div>
          </div>
          <div>
            <p>Image Borders</p>
            <div className="buttons-wrapper">
              <div className="jump-library mt-0" onClick={borderHandlerOn}>
                On
              </div>
              <div className="jump-library mt-0" onClick={borderHandlerOff}>
                Off
              </div>
            </div>
            <p>Image Shadows</p>
            <div className="buttons-wrapper">
              <div className="jump-library mt-0" onClick={imageBorderHandlerOn}>
                On
              </div>
              <div className="jump-library mt-0" onClick={imageBorderHandlerOff}>
                Off
              </div>
            </div>
          </div>
          <div>
            <p>Text Colour</p>
            <input
              type="color"
              className="form-control form-control-color"
              id="textColorPicker"
              value={textColor}
              title="Choose your color"
              onChange={(e) => handleTextColor(e)}
            ></input>
          </div>
          <div>
            <p>Background Colour</p>
            <input
              type="color"
              className="form-control form-control-color"
              id="backgroundColorPicker"
              value={backgroundColor}
              title="Choose your color"
              onChange={(e) => handleBackgroundColor(e)}
            ></input>
          </div>
        </div>
        <Button onClick={handleMoodboardSave} variant="outline-success" className="mt-2">
          {showSpinner ? (
            <>
              Saving{" "}
              <Spinner className="ml-2" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            </>
          ) : (
            "Save Moodboard"
          )}
        </Button>
      </div>
    </div>
  )
}
