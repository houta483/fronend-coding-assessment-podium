import React from 'react'

function Search ({ 
  absInputChange,
  value, 
  absQueryParamChange,
  queryParamType 
}) {

  return (
  <div className="flex-center bottom-padding">
    <input
      type="text"
      placeholder="Please enter a search term" 
      onChange={absInputChange}
      value={value}
      />
    
    <select className='bg-light searchCriterion' value={queryParamType} onChange={absQueryParamChange}>
      <option value="">
        Select Search Criterion
      </option>
      <option value="id">
        ID
      </option>
      <option value="body">
        Body
      </option>
      <option value="author">
        Author
      </option>
      <option value="rating">
        Rating
      </option>
    </select>
  </div>

  )
}



export default Search;