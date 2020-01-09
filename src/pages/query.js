import React from "react"

import Layout from "../components/layout"

class Query extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render () {
    return (
      <Layout>
        <form>
          <label>
            ID: 
            <input type="text" name="/" />
          </label>
          <button type="submit">Submit</button>
        </form>
    </Layout>
    )
  }
}


export default Query
