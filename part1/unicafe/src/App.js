import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({good, neutral, bad, all, avg, percent}) => {
  if (all === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine value={good} text="good"/>
        <StatisticLine value={neutral} text="neutral"/>
        <StatisticLine value={bad} text="bad"/>
        <StatisticLine value={all} text="all"/>
        <StatisticLine value={avg} text="average"/>
        <StatisticLine value={percent} text="positive"/>
      </tbody>
    </table>
  )
}
  
const StatisticLine = ({text, value}) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
  
}


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const addGood = () => {
    setGood(good+1)
    setAll(all+1)
  }
  const addNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }
  const addBad = () => {
    setBad(bad+1)
    setAll(all+1)
    
  }

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={addGood} text="good"/>
        <Button handleClick={addNeutral} text="neutral"/>
        <Button handleClick={addBad} text="bad"/>
      </div>
      <h1>Statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={((good+bad*(-1))/all).toFixed(1)} percent={((good/all)*100).toFixed(1)+"%"}/>
      </div>
    </div>
  )
}

export default App