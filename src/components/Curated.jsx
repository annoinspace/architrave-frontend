import { useState } from "react"
import { Container, Row } from "react-bootstrap"

export default function Curated() {
  const [hovered, setHovered] = useState(null)
  const swatches = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const setHover = () => {}

  // const swatchElements = swatches.map((swatch, index) => <div key={index} className="swatch"></div>)

  // const rows = []
  // for (let i = 0; i < swatchElements.length; i += 14) {
  //   const rowElements = swatchElements.slice(i, i + 14)
  //   const row = (
  //     <Row key={i} className="row swatch-container">
  //       {rowElements}
  //     </Row>
  //   )
  //   rows.push(row)
  // }

  return (
    <Container className="con">
      <h1 className="page-header">Curated</h1>

      <Row className="row swatch-container">
        {swatches.map((swatch, i) => (
          <div className="swatch" key={i}></div>
        ))}
      </Row>
    </Container>
  )
}
