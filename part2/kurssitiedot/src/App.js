import React from 'react'

const Header = (props) =>{
  return(
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) =>{
  return(
    <>
      <Part part={props.part.parts[0].name} ex={props.part.parts[0].exercises} />
      <Part part={props.part.parts[1].name} ex={props.part.parts[1].exercises} />
      <Part part={props.part.parts[2].name} ex={props.part.parts[2].exercises} />
    </>
  )
}

const Total = (props) =>{
  return(
    <>
      <p>Number of exercises {props.total.parts[0].exercises + props.total.parts[1].exercises + props.total.parts[2].exercises}</p>
    </>
  )
}

const Part = (props) =>{
  return(
    <>
      <p>{props.part} {props.ex}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content part={course}/>
      <Total total={course} />
    </div>
  )
}

export default App