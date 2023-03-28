import React from "react"
import logo from "../assets/logo.png"
import { Image } from "react-bootstrap"

export default function Footer() {
  return (
    <div id="footer">
      <Image id="footer-icon" src={logo} />
    </div>
  )
}
