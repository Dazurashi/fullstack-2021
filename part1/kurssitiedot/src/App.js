import React from 'react'

const Header = (props) =>{
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) =>{
  return(
    <>
      <p>
        {props.part1} {props.ex1}
      </p>
      <p>
        {props.part2} {props.ex2}
      </p>
      <p>
        {props.part3} {props.ex3}
      </p>
    </>
  )
}

const Total = (props) =>{
  return(
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} ex1={exercises1} ex2={exercises2} ex3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App