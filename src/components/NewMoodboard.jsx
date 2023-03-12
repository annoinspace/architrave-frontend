import React, { useState } from "react"
import { Image } from "react-bootstrap"
import { useSelector } from "react-redux"

export default function NewMoodboard() {
  const products = useSelector((state) => state.moodboard.products)
  const palette = useSelector((state) => state.moodboard.palette)
  const [draggedImage1, setDraggedImage1] = useState(null)
  const [draggedImage2, setDraggedImage2] = useState(null)

  const numberOfImages = products.length

  const handleDrop1 = (e) => {
    e.preventDefault()
    const productImage = e.dataTransfer.getData("text/plain")
    console.log("product.image", productImage)
    setDraggedImage1(productImage)
  }
  const handleDrop2 = (e) => {
    e.preventDefault()
    const productImage = e.dataTransfer.getData("text/plain")
    console.log("product.image", productImage)
    setDraggedImage2(productImage)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }
  console.log("products selected -->", products)
  console.log("palette selected -->", palette)
  return (
    <div id="moodboard-background">
      <div id="moodboard-section">
        <div
          id="image-1"
          onDrop={handleDrop1}
          onDragOver={handleDragOver}
          style={{
            background: draggedImage1 ? `url(${draggedImage1}) no-repeat center/contain` : "none"
          }}
        ></div>
        <div
          id="image-2"
          onDrop={handleDrop2}
          onDragOver={handleDragOver}
          style={{
            background: draggedImage2 ? `url(${draggedImage2}) no-repeat center/contain` : "none"
          }}
        ></div>
      </div>
      <div id="available-images-wrapper">
        <div id="available-images-inner">
          {products.map((product) => (
            <div
              className="available-images"
              key={product._id}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", product.image)
              }}
            >
              <Image src={product.image} className="available-images-image" />
            </div>
          ))}
        </div>
      </div>
      <div id="moodboard-settings-section">
        <div id="moodboard-settings-section-inner"></div>
      </div>
    </div>
  )
}
