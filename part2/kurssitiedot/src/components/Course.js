import React from 'react'
//TODO laita nää eri komponentteihin
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
    const ex = props.course.parts.map(course => course.exercises)
    return (
            <>
                total of {ex.reduce((s, p) => s + p)} exercises 
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