import React, { useState } from 'react'

const Filter = ({newFind, handleFindChange}) => {
  return <div>
    filter shown with <input value={newFind} onChange={handleFindChange} />
  </div>
}

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

const Persons = ({persons, newFind}) => {
  return <ul>
  {persons.filter(person => person.name.toUpperCase().includes(newFind.toUpperCase())).map(person =>
    <li key={person.name}>
      {person.name} {person.number}
    </li>)}
</ul>
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNum, setNewNum] = useState("")
  const [newFind, setNewFind] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    console.log("Nappia painettu", event.target)
    const personObject = {
      name: newName,
      number: newNum
    }
    if (persons.filter(person => person.name === personObject.name).length) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNum("")
    }else{
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNum("")
    }
  }

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFindChange = (event) => {
    setNewFind(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFind={newFind} handleFindChange={handleFindChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} newNum={newNum} handlePersonChange={handlePersonChange} handleNumChange={handleNumChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFind={newFind} />
    </div>
  )

}

export default App