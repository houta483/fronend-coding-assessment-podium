import React from "react"
import { Link } from "gatsby"
import Reviews from "../components/reviews"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <h1 className='header-lg center-text'> All Reviews </h1>
      <Reviews></Reviews>
      <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage