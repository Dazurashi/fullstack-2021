import React from "react"

const Persons = ({persons, newFind, handleDeletePerson}) => {

    return (
      <ul>
        {persons.filter(person => person.name.toUpperCase().includes(newFind.toUpperCase())).map(person => (
          <UniquePerson key={person.id} name={person.name} num={person.number} deletePerson={handleDeletePerson(person.name, person.id)}/> 
        ))}
      </ul>
    )
  }
  
  
  
const UniquePerson = ({name, num, deletePerson}) =>{
  return (
    <li>{name} {num} <button onClick={deletePerson}> delete</button></li>
    )
}

export default Persons