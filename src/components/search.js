import React from 'react'

function Search ({ 
  absInputChange, 
  absPaste, 
  absClickFunction, 
  value, 
  abcQueryParamChange,
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
    <button  onClick={absClickFunction}>Search</button>
    
    <select className='bg-light searchCriterion' value={queryParamType} onChange={abcQueryParamChange}>
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
      <option value="reset">
        Reset
      </option>
    </select>
  </div>

  )
}



export default Search;