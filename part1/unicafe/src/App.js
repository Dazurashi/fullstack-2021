import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({value, text}) => 
  <div>{text} {value}</div>


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good+1)
  }
  const addNeutral = () => {
    setNeutral(neutral+1)
  }
  const addBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={addGood} text="good"/>
        <Button handleClick={addNeutral} text="neutral"/>
        <Button handleClick={addBad} text="bad"/>
      </div>
      <h1>Statistics</h1>
      <Statistics value={good} text={"good"}/>
      <Statistics value={neutral} text={"neutral"}/>
      <Statistics value={bad} text={"bad"}/>
    </div>
  )
}

export default App