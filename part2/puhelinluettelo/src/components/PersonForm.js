import React from "react"

const PersonForm = ({newName, newNum, handlePersonChange, handleNumChange, addPerson}) => {
    return <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonChange}/>
      </div>
      <div>
        number: <input value={newNum} onChange={handleNumChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
}

export default PersonForm