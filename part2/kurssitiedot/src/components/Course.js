import React from 'react'

const Course = (props) => {
    console.log(props)

    return(
        <>
            <Header course={props.course} />
            <Content course={props.course} />
            <Total course={props.course} />
        </>
    )
  }
  
  const Header = (props) =>{
    return(
        <>
            <h1>{props.course.name}</h1>
        </>
    )
  }
  
  const Content = (props) =>{
      console.log(props)
    return(
        <>
            {props.course.parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </>
    )
  }
  
  const Total = (props) =>{
    const parts = props.course.parts.map(course => course.exercises)
    return (
            <>
                total of {parts.reduce((s, p) => s + p)} exercises 
            </>
    )
  }
  
  const Part = (props) =>{
    console.log(props)
    return(
        <>
            <p>{props.name} {props.exercises}</p>
        </>
    )
  }

export default Course