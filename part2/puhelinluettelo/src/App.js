import React, { useState, useEffect } from 'react'
import personService from "./services/persons"

//TODO laita komponentit kansioihin ja tee index.css kuten tehtävässä pyydetään. Siisti myös koodia

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

const Persons = ({persons, newFind, handleDeletePerson}) => {

  return (
    <ul>
      {persons.filter(person => person.name.toUpperCase().includes(newFind.toUpperCase())).map(person => (
        <UniquePerson key={person.id} name={person.name} num={person.number} deletePerson={handleDeletePerson(person.name, person.id)}/> 
      ))}
    </ul>
  )
}

const Notification = ({msg}) => {
  if (msg === null){
      return null
  }
  return (
      <div className="error"> {msg}</div>
  )
}

const UniquePerson = ({name, num, deletePerson}) =>{
  return (
<li>{name} {num} <button onClick={deletePerson}> delete</button></li>
  )
}

const App = () => {
  // const [ persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456'},
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ]) 
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNum, setNewNum] = useState("")
  const [newFind, setNewFind] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum
    }
    if (persons.filter(person => person.name === personObject.name).length > 0){
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        personService.update(oldPerson.id, {...oldPerson, number: newNum}).then(newPerson => {
          setPersons(persons.map(person => (person.name === newName ? newPerson : person)))
        }).catch(error => {
          setNotification(`Information of ${personObject.name} has already been removed from server`)
          console.log("Failed to update")
        })
        setPersons(persons.concat(personObject))
        setNotification(`Number of ${personObject.name} has been updated`)
        setNewName("")
        setNewNum("")
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    } 
    else{
      personService.addPerson(personObject).then(person => {
        setPersons(persons.concat(person))
        setNotification(`Added ${personObject.name}`)
        setNewName("")
        setNewNum("")
      }).catch(error => {
        setNotification(error.response.data.error)
        console.log(error.response.data)
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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

  const handleDeletePerson = (name, id) => {
    return () => {
      if (window.confirm(`Delete ${name} ?`)) {
        personService.deletePerson(id).then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`Deleted ${name}`)
        }).catch(error => {
          setPersons(persons.filter(person => person.id !== name))
          setNotification(`Person named ${name} has already been deleted`)
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notification}/>
      <Filter newFind={newFind} handleFindChange={handleFindChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} newNum={newNum} handlePersonChange={handlePersonChange} handleNumChange={handleNumChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFind={newFind} handleDeletePerson={handleDeletePerson}/>
    </div>
  )

}

export default App