import React, { useState } from "react"
import { Image, Button } from "react-bootstrap"
import { useSelector } from "react-redux"

export default function NewMoodboard() {
  const products = useSelector((state) => state.moodboard.products)
  const palette = useSelector((state) => state.moodboard.palette.colors)

  const [draggedProduct1, setDraggedProduct1] = useState(null)
  const [draggedProduct2, setDraggedProduct2] = useState(null)
  const [draggedProduct3, setDraggedProduct3] = useState(null)
  const [draggedProduct4, setDraggedProduct4] = useState(null)
  const [draggedProduct5, setDraggedProduct5] = useState(null)
  const [draggedProduct6, setDraggedProduct6] = useState(null)
  const [draggedProduct7, setDraggedProduct7] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState("FFFFFF")
  const [swatchStyle, setSwatchStyle] = useState("swatch-square")

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

  const handleBackgroundColor = (e) => {
    setBackgroundColor(e.target.value)
  }

  const handleSaveMoodboard = () => {
    const moodboard = {
      backgroundColor: backgroundColor,
      swatchStyle: swatchStyle
    }
  }

  return (
    <div id="moodboard-background">
      <div id="moodboard-section" style={{ backgroundColor: `${backgroundColor}` }}>
        <div id="moodboard-swatches">
          {palette &&
            palette.map((color, index) => (
              <div key={index} className={swatchStyle} style={{ backgroundColor: `${color}` }}></div>
            ))}
        </div>
        <div id="image-1" onDrop={(e) => handleDrop(e, 1)} onDragOver={handleDragOver}>
          {draggedProduct1 && <Image src={draggedProduct1} id="image-1-image" />}
        </div>
        <div id="image-2" onDrop={(e) => handleDrop(e, 2)} onDragOver={handleDragOver}>
          {draggedProduct2 && <Image src={draggedProduct2} id="image-2-image" />}
        </div>
        <div id="image-3" onDrop={(e) => handleDrop(e, 3)} onDragOver={handleDragOver}>
          {draggedProduct3 && <Image src={draggedProduct3} id="image-3-image" />}
        </div>
        <div id="image-4" onDrop={(e) => handleDrop(e, 4)} onDragOver={handleDragOver}>
          {draggedProduct4 && <Image src={draggedProduct4} id="image-4-image" />}
        </div>
        <div id="image-5" onDrop={(e) => handleDrop(e, 5)} onDragOver={handleDragOver}>
          {draggedProduct5 && <Image src={draggedProduct5} id="image-5-image" />}
        </div>
        <div id="image-6" onDrop={(e) => handleDrop(e, 6)} onDragOver={handleDragOver}>
          {draggedProduct6 && <Image src={draggedProduct6} id="image-6-image" />}
        </div>
        <div id="image-7" onDrop={(e) => handleDrop(e, 7)} onDragOver={handleDragOver}>
          {draggedProduct7 && <Image src={draggedProduct7} id="image-7-image" />}
        </div>
      </div>
      <div id="available-images-wrapper">
        <div id="available-images-inner">
          {products.map((product) => (
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
        </div>
      </div>
      <div id="moodboard-settings-section">
        <div id="moodboard-settings-section-inner">
          <h6>Settings</h6>
          <p>Swatch Style</p>
          <div id="swatch-buttons-wrapper">
            <Button onClick={squareSwatches}>Square</Button>
            <Button onClick={circleSwatches}>Circle</Button>
            <Button onClick={rectangleSwatches}>Rectangle</Button>
            <Button onClick={strokeSwatches}>Stroke</Button>
            <Button onClick={pillSwatches}>Pill</Button>
          </div>
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
    </div>
  )
}
