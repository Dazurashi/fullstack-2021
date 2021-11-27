import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const addPerson = (event) => {
    event.preventDefault()
    console.log("Nappia painettu", event.target)
    const personObject = {
      name: newName,
    }
    if (persons.filter(person => person.name === personObject.name).length) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName("")
    }else{
      setPersons(persons.concat(personObject))
      setNewName("")
    }
  }
  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>
            {person.name}
          </li>)}
      </ul>
    </div>
  )

}

export default App