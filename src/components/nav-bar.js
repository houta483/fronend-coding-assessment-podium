import React from "react";
import { Link } from "gatsby";
import './layout.css'

function navBar () {
  const pages = ['Login', 'All Reviews', 'Query', 'Logout']
  const links = ["", "allReviews", "query", ""]

  return (
    <ul className='flex-center space-around border '>
      {pages.map((page, index) => (
        <li className='alignVerticalCenter' key={page}>
          <Link
            to={links[index]}
            className='nav-link'
          >
            {page}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default navBar