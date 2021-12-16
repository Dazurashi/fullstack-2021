import React, { useState, useEffect } from 'react'
import personService from "./services/persons"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"

const App = () => {

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
          setNotification({notification: `Information of ${personObject.name} has already been removed from server`, type: "error"})
          console.log("Failed to update")
        })
        setPersons(persons.concat(personObject))
        setNotification({notification: `Number of ${personObject.name} has been updated`, type: "success"})
        console.log("Number updated")
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
        setNotification({notification: `Added ${personObject.name}`, type: "success"})
        console.log("Added new")
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
          setNotification({notification: `Deleted ${name}`, type: "success"})
          console.log("Deleted someone")
        }).catch(error => {
          setPersons(persons.filter(person => person.id !== name))
          setNotification({notification: `Person named ${name} has already been deleted`, type: "error"})
          console.log("Name already deleted")
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