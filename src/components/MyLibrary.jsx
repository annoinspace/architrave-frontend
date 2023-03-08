import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Container, Image } from "react-bootstrap"
import { FaTrashAlt } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import ImageUploadPalette from "./ImageUploadPalette"
import { deleteColorPalette } from "../redux/actions/userActions"
import UploadProducts from "./UploadProducts"

export default function MyLibrary() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser.currentUser)
  const colorPalettes = currentUser?.colorLibrary
  const userProducts = currentUser?.productLibrary

  useEffect(() => {
    console.log("colorPalettes", colorPalettes)
  }, [colorPalettes])

  const trashClickHandler = (paletteId) => {
    console.log("trash clicked", paletteId)
    dispatch(deleteColorPalette(paletteId))
  }
  const editClickHandler = (palette) => {
    console.log(palette)
  }
  return (
    <Container className="p-5">
      <div className="header-top">
        <h1 className="text-center">My Library</h1>
      </div>
      <div>
        <div>
          <div className="d-flex justify-content-between">
            <h3>colour palettes</h3>
            <ImageUploadPalette />
          </div>
          {colorPalettes.length === 0 && <div>No saved colour palettes</div>}
        </div>
        <br />
        <div>
          {colorPalettes &&
            colorPalettes.map((palette) => (
              <div key={palette._id} className="user-palette-wrapper">
                <div className="palette-header">
                  <h5>{palette.paletteName}</h5>
                  <div>
                    {/* <FiEdit2 className="small-icon" onClick={() => editClickHandler(palette)} /> */}
                    <FaTrashAlt className="small-icon" onClick={() => trashClickHandler(palette._id)} />
                  </div>{" "}
                </div>
                <div className="user-palette-wrapper-swatch">
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
        <div className="d-flex justify-content-between">
          <h3>Products</h3>
          <UploadProducts />
        </div>
        {userProducts.length === 0 && <div>No saved products</div>}
        {userProducts.map((product) => (
          <div key={product._id} className="product-display-list">
            <Image src={product.image} className="product-display-list-image" />
            <div>{product.name} </div>
            <div>{product.category} </div>
            <div>{product.price} </div>
          </div>
        ))}
      </div>
      <div id="my-swatches"></div>
    </Container>
  )
}
