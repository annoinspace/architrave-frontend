import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Button, Container } from "react-bootstrap"
import ImageUpload from "./ImageUpload"

export default function MyLibrary() {
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const colorPalettes = currentUser?.colorLibrary
  console.log(colorPalettes)

  useEffect(() => {
    console.log("colorPalettes", colorPalettes)
  }, [colorPalettes])

  return (
    <Container className="p-5">
      <div className="header-top">
        <h1 className="text-center">My Library</h1>
      </div>
      <div>
        <div className="d-flex justify-content-between">
          <h3>colour palettes</h3>

          <ImageUpload />
        </div>
        <div>
          {colorPalettes &&
            colorPalettes.map((palette) => (
              <div key={palette._id}>
                <h5>{palette.paletteName}</h5>
                <div className="d-flex">
                  {palette.colors.map((color) => (
                    <div
                      key={color}
                      style={{
                        backgroundColor: color,
                        width: "90px",
                        height: "90px",
                        marginInline: "15px",
                        borderRadius: "50%"
                      }}
                    ></div>
                  ))}{" "}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h3>solo swatches</h3>
        <div>colors</div>
      </div>
      <div>
        <h3>images</h3>
        <div>images</div>
      </div>
      <div id="my-swatches"></div>
    </Container>
  )
}
