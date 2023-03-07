import React, { useState, useEffect } from "react"

import { AiOutlineCloseCircle } from "react-icons/ai"
import { Button, Form, Modal, Alert } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { saveColorPalette } from "../redux/actions/userActions"

const ImageUpload = ({ numberOfColors = 49 }) => {
  const [image, setImage] = useState(null)
  const [colors, setColors] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [imageSource, setImageSource] = useState("")
  const [selectedColors, setSelectedColors] = useState([])
  const [paletteName, setPaletteName] = useState(null)
  const [colorPalette, setColorPalette] = useState("")
  const [alert, setAlert] = useState(false)
  const dispatch = useDispatch()

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

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setImage(URL.createObjectURL(file))
    setImageSource("file")
    setSelectedColors([])
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedColors([])
    setColors([])
    setImage(null)
    setPaletteName(null)
    setAlert(false)
  }
  const addToMySwatches = (color) => {
    console.log("color", color)
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color])
    }
  }
  const savePalette = () => {
    if (!paletteName) {
      setAlert(true)
    } else {
      const newPalette = {
        paletteName: paletteName,
        colors: selectedColors
      }
      console.log(newPalette)
      dispatch(saveColorPalette(newPalette))
      closeModal()
    }
  }

  return (
    <div>
      <Button onClick={() => setModalIsOpen(true)}>New Palette</Button>

      <Modal show={modalIsOpen} onHide={closeModal} id="image-swatch-modal">
        <div id="swatch-modal-inner-wrapper">
          <div className="d-flex justify-content-center mb-5">
            <h2 style={{ flexGrow: 1, marginLeft: "30px" }}>Extract Colour Palette</h2>
            <AiOutlineCloseCircle onClick={closeModal} className="icon-button" />
          </div>

          <div className="d-flex justify-content-center">
            {image && <img src={imageSource === "file" ? image : image} alt="" id="image-swatch-upload" />}
            <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "600px", justifyContent: "center" }}>
              {image && (
                <div className="w-100 text-center mb-3">
                  Select the extracted Colours and save to create your custom palette
                </div>
              )}
              {shuffledSwatches.map((color, index) => (
                <div className="d-flex flex-column justify-content-center p-1">
                  <div
                    onClick={() => addToMySwatches(color)}
                    key={color}
                    value={color + "swatch"}
                    style={{
                      backgroundColor: color,
                      width: "75px",
                      height: "75px",
                      marginInline: "15px",
                      borderRadius: "50%",
                      cursor: "pointer"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 mb-5 text-center">
            {selectedColors.length > 0 && <h5 className="mt-3">Selected Swatches</h5>}
            <div className=" m-5" id="selected-swatches-in-modal">
              {selectedColors.map((color) => (
                <div
                  key={color}
                  value={color}
                  style={{
                    backgroundColor: color,
                    width: "90px",
                    height: "90px",
                    marginInline: "15px",
                    borderRadius: "50%"
                  }}
                />
              ))}{" "}
            </div>
            {selectedColors.length > 0 && (
              <Form className="d-flex flex-column justify-content-center align-items-center">
                {alert && (
                  <Alert variant="danger" className="w-50 m-0">
                    name your palette before saving
                  </Alert>
                )}
                <Form.Group className="mb-3 mt-3 d-flex justify-content-center w-50" controlId="paletteName">
                  <Form.Control
                    type="text"
                    placeholder="Name Your Palette"
                    className="w-100"
                    onChange={(e) => {
                      setPaletteName(e.target.value)
                    }}
                  />
                  <Button className="ml-2" onClick={savePalette}>
                    Save
                  </Button>
                </Form.Group>
              </Form>
            )}
          </div>
          <input type="file" onChange={handleImageChange} className="mt-2" />
        </div>
      </Modal>
    </div>
  )
}

export default ImageUpload
