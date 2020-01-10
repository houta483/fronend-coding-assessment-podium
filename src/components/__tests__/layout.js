import React from "react"
import renderer from "react-test-renderer"

import Layout from "../layout"

describe("Card", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Layout siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})