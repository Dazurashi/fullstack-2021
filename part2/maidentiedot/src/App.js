import React, {useState, useEffect} from "react"
import axios from "axios"

const Filter = (props) => {
  return <div>
    find countries <input />
  </div>
}

const Countries = ({countries, search}) => {
  const [visible, setVisible] = useState()

  const showDetails = event => {
    console.log(event.target.value)
    const maa = countries.filter(country =>
      country.name.includes(event.target.value))
      console.log("maa: ", maa)
      setVisible(maa[0])
  }

  const list = countries.filter(country => 
    country.name.toUpperCase().includes(search.toUpperCase())
  )
  
  

  if(list.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if(visible !== undefined) {
    return (
      <Country key={visible.name} name={visible.name} capital={visible.capital} />
    )
  }
  if(list.length > 1){
    return(
      <ul>
        {countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()).map(country => 
        <List key={country.name} name={country.name} country={country} showDetails={showDetails}/>))}
      </ul>
    )
  }
  return (
    <ul>
      {countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase())).map(country => (
        <Country key={country.name} name={country.name} capital={country.capital}/>
      ))}
    </ul>
  )
}

const Country = ({name, capital}) => {
  return <div>
    <h1>{name}</h1>
    capital {capital}
  </div>
}

const List = ({name, country, showDetails}) => {
  return (
    <li key={name}> 
    {name}
    <button value={country.name} onClick={showDetails}>show</button>
    </li>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  const handleSearchChange = event => {setSearch(event.target.value)}

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(response =>
    setCountries(response.data))
  }, [])

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <Countries countries={countries} search={search}/>
    </div>
  )
}

export default App;
