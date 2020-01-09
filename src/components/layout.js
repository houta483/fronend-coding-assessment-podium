import React from "react"
import NavBar from "./nav-bar"

import "./layout.css"

const Layout = ({ children }) => (
  <div>
    <NavBar />
    {children}
  </div>
)

export default Layout
