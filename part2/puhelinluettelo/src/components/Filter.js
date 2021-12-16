import React from "react"

const Filter = ({newFind, handleFindChange}) => {
    return <div>
      filter shown with <input value={newFind} onChange={handleFindChange} />
    </div>
}

export default Filter