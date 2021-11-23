import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const PopularVote = ({mostPopular, points}) => {
  if (points === 0) {
    return <p>No votes given yet</p>
  }
  return <p>{mostPopular} has {points} votes!</p>
}

const Anecdotes = ({ane, points}) => {
  return <p>{ane} has {points} points</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [popular, setPopular] = useState(selected)

  //This also eliminates 2 or more same numbers appearing in a row
  const setNumber = () => {
    const randomNum = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomNum)
    if (selected === randomNum) {
      setNumber()
    }
    
  }

  const addVote = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    if (copy[selected] > points[popular]) {
      setPopular(selected)
      
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdotes ane={anecdotes[selected]} points={points[selected]} />
      
      <div>
        <Button handleClick={setNumber} text="next anecdote" />
        <Button handleClick={addVote} text="vote" />
      </div>
      <h1>Anecdote with most votes</h1>
        <PopularVote mostPopular={anecdotes[popular]} points={points[popular]} />
      <div>
        
      </div>
    </div>
  )
}

export default App