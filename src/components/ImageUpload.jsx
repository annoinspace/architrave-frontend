import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import { Button } from "react-bootstrap"

const ImageUpload = ({ numberOfColors = 49 }) => {
  const [image, setImage] = useState(null)
  const [colors, setColors] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [imageSource, setImageSource] = useState("")
  const [swatches, setSwatches] = useState([])
  const [selectedColors, setSelectedColors] = useState([])

  useEffect(() => {
    if (!image) {
      return
    }

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    const divisionNumber = 7
    img.src = image
    img.onload = () => {
      const partWidth = img.width / divisionNumber
      const partHeight = img.height / divisionNumber
      const dominantColors = []

      for (let i = 0; i < divisionNumber; i++) {
        for (let j = 0; j < divisionNumber; j++) {
          const x = i * partWidth
          const y = j * partHeight
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          canvas.width = partWidth
          canvas.height = partHeight
          ctx.drawImage(img, -x, -y)
          const pixels = ctx.getImageData(0, 0, partWidth, partHeight).data
          const colorCounts = {}
          let maxCount = 0
          let dominantColor

          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i]
            const g = pixels[i + 1]
            const b = pixels[i + 2]
            const color = `rgb(${r}, ${g}, ${b})`

            if (!colorCounts[color]) {
              colorCounts[color] = 0
            }

            colorCounts[color]++

            if (colorCounts[color] > maxCount) {
              maxCount = colorCounts[color]
              dominantColor = color
            }
          }

          let isClose = false
          for (const existingColor of dominantColors) {
            const [r, g, b] = existingColor.split(",").map((x) => parseInt(x.trim().split("(")[1]))

            const [dr, dg, db] = dominantColor.split(",").map((x) => parseInt(x.trim().split("(")[1]))

            const distance = Math.sqrt((r - dr) ** 2 + (g - dg) ** 2 + (b - db) ** 2)
            if (distance < 100) {
              isClose = true
              break
            }
          }

          if (!isClose) {
            dominantColors.push(dominantColor)
          }
        }
      }

      const sortedColors = dominantColors
        .sort((color1, color2) => {
          const [r1, g1, b1] = color1.split(",").map((x) => parseInt(x.trim().split("(")[1]))
          const [r2, g2, b2] = color2.split(",").map((x) => parseInt(x.trim().split("(")[1]))
          const brightness1 = (r1 * 299 + g1 * 587 + b1 * 114) / 1000
          const brightness2 = (r2 * 299 + g2 * 587 + b2 * 114) / 1000
          return brightness1 - brightness2
        })
        .slice(0, numberOfColors)

      setColors(sortedColors)
    }
  }, [image, numberOfColors, imageSource])

  const filteredColors = colors.filter((color, index, self) => {
    // Split the color string into its individual RGB components
    const [r1, g1, b1] = color.slice(4, -1).split(",").map(Number)
    for (let i = index + 1; i < self.length; i++) {
      const [r2, g2, b2] = self[i].slice(4, -1).split(",").map(Number)
      // Calculate the color difference between the two colors
      const diff = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
      if (diff < 30) {
        // If the difference is less than 50, the colors are considered too similar and are filtered out
        return false
      }
    }
    return true
  })

  // let shuffledSwatches = [...filteredColors].sort(() => Math.random() - 0.5)
  let shuffledSwatches = filteredColors
  console.log("shuffledSwatches", shuffledSwatches)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setImage(URL.createObjectURL(file))
    setImageSource("file")
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedColors([])
  }
  const addToMySwatches = (color) => {
    console.log("color", color)
    setSelectedColors([...selectedColors, color])
  }
  return (
    <div>
      <Button onClick={() => setModalIsOpen(true)}>Upload Image</Button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Upload Image</h2>
        <input type="file" onChange={handleImageChange} />
        <br />
        <br />
        <div className="d-flex justify-content-center">
          {image && <img src={imageSource === "file" ? image : image} alt="" id="image-swatch-upload" />}
          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "600px" }}>
            {image && (
              <div className="w-100 text-center">
                Select the extracted Colours and save to create your custom palette
              </div>
            )}
            {shuffledSwatches.map((color, index) => (
              <div className="d-flex flex-column">
                <div
                  onClick={() => addToMySwatches(color)}
                  key={color}
                  value={color}
                  style={{
                    backgroundColor: color,
                    width: "90px",
                    height: "90px",
                    marginInline: "15px"
                  }}
                />
                <div style={{ fontSize: "10px" }}>{color}</div>{" "}
              </div>
            ))}
          </div>
        </div>

        {selectedColors.map((color) => (
          <div
            key={color}
            value={color}
            style={{
              backgroundColor: color,
              width: "90px",
              height: "90px",
              marginInline: "15px"
            }}
          />
        ))}
        <Button onClick={closeModal}>Close</Button>
      </Modal>
    </div>
  )
}

export default ImageUpload
