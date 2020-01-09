import React from 'react'
import './layout.css'
// import PropTypes from 'prop-types'

function Card ({ rating, publish_time, publish_date, ID, body, author }) {
  return (
    <div className='card bg-light'>

    <div className='top-contents'> 
      <div className='small'> {publish_time} </div>
      <div className='small'> {ID} </div>    
      <div className='small'> {publish_date} </div>
    </div>

      <h4 className='header-lg center-text'>
        "{body}"
      </h4>

      <div className='center-text'>
        <div>
          {author}
        </div>
        <div>
          {rating}
        </div>
      </div>
    </div>
  )
}

export default Card;