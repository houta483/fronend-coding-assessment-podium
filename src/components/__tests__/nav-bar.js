import React from "react"
import renderer from "react-test-renderer"

import NavBar from "../nav-bar"

describe("Card", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<NavBar siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})