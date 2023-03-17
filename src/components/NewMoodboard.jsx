import React, { useState, useRef, useCallback } from "react"
import { Image, Button, Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import * as htmlToImage from "html-to-image"
import { toJpeg } from "html-to-image"
import { Buffer } from "buffer"
import { useNavigate } from "react-router-dom"
import { addMoodboardImage } from "../redux/actions/moodboardActions"

export default function NewMoodboard() {
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
  const [moodboardJpeg, setMoodboardJpeg] = useState(null)
  const [imageShadow, setImageShadow] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
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

  const handleMoodboardSave = useCallback(async () => {
    if (ref.current === null) {
      return
    }
    setShowSpinner(true)

    try {
      const dataUrl = await toJpeg(ref.current, { cacheBust: true })
      console.log("dataUrl", dataUrl)
      const blob = await fetch(dataUrl).then((res) => res.blob())

      const formData = new FormData()
      formData.append("moodboard", blob, "moodboard.jpeg")
      console.log("form data file", formData.get("moodboard"))

      if (formData) {
        dispatch(addMoodboardImage(formData, projectId))
        setTimeout(() => {
          setShowSpinner(false)
          navigate(`/project-details/${projectId}`)
        }, 2000)
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
        <div id="moodboard-swatches">
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
        <div
          id="image-1"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 1)}
          onDragOver={handleDragOver}
        >
          {draggedProduct1 && <Image src={draggedProduct1} id="image-1-image" />}
        </div>
        <div
          id="image-2"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 2)}
          onDragOver={handleDragOver}
        >
          {draggedProduct2 && <Image src={draggedProduct2} id="image-2-image" />}
        </div>
        <div
          id="image-3"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 3)}
          onDragOver={handleDragOver}
        >
          {draggedProduct3 && <Image src={draggedProduct3} id="image-3-image" />}
        </div>
        <div
          id="image-4"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 4)}
          onDragOver={handleDragOver}
        >
          {draggedProduct4 && <Image src={draggedProduct4} id="image-4-image" />}
        </div>
        <div
          id="image-5"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 5)}
          onDragOver={handleDragOver}
        >
          {draggedProduct5 && <Image src={draggedProduct5} id="image-5-image" />}
        </div>
        <div
          id="image-6"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 6)}
          onDragOver={handleDragOver}
        >
          {draggedProduct6 && <Image src={draggedProduct6} id="image-6-image" />}
        </div>
        <div
          id="image-7"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 7)}
          onDragOver={handleDragOver}
        >
          {draggedProduct7 && <Image src={draggedProduct7} id="image-7-image" />}
        </div>
        <div
          id="image-8"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 8)}
          onDragOver={handleDragOver}
        >
          {draggedProduct8 && <Image src={draggedProduct8} id="image-8-image" />}
        </div>
        <div
          id="image-9"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 9)}
          onDragOver={handleDragOver}
        >
          {draggedProduct9 && <Image src={draggedProduct9} id="image-9-image" />}
        </div>
        <div
          id="image-10"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 10)}
          onDragOver={handleDragOver}
        >
          {draggedProduct10 && <Image src={draggedProduct10} id="image-10-image" />}
        </div>
        <div
          id="image-11"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 11)}
          onDragOver={handleDragOver}
        >
          {draggedProduct11 && <Image src={draggedProduct11} id="image-11-image" />}
        </div>
        <div
          id="image-12"
          style={{
            border: border ? "1px solid black" : "none",
            boxShadow: imageShadow ? "2px 2px 5px rgba(0,0,0,0.40)" : "none"
          }}
          onDrop={(e) => handleDrop(e, 12)}
          onDragOver={handleDragOver}
        >
          {draggedProduct12 && <Image src={draggedProduct12} id="image-12-image" />}
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
            <div id="swatch-buttons-wrapper">
              <Button onClick={squareSwatches}>Square</Button>
              <Button onClick={circleSwatches}>Circle</Button>
              <Button onClick={rectangleSwatches}>Rectangle</Button>
              <Button onClick={strokeSwatches}>Stroke</Button>
              <Button onClick={archSwatches}>Arch</Button>
              <Button onClick={pillSwatches}>Pill</Button>
            </div>

            <p>Swatch Shadows</p>
            <Button onClick={swatchShadowOn}>On</Button>
            <Button onClick={swatchShadowOff}>Off</Button>
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
          <div>
            <p>Image Borders</p>
            <Button onClick={borderHandlerOn}>On</Button>
            <Button onClick={borderHandlerOff}>Off</Button>
            <p>Image Shadows</p>
            <Button onClick={imageBorderHandlerOn}>On</Button>
            <Button onClick={imageBorderHandlerOff}>Off</Button>
          </div>
        </div>
        <Button onClick={handleMoodboardSave}>
          {showSpinner ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            "Save Moodboard"
          )}
        </Button>
      </div>
    </div>
  )
}
