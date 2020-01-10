import React from "react"
import renderer from "react-test-renderer"
import ReactDOM from "react-dom"

import Reviews from "../reviews"

describe("Reviews", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Reviews siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Reviews></Reviews>, div);
  ReactDOM.unmountComponentAtNode(div);
})



