const Total = (props) =>{
    const ex = props.course.parts.map(course => course.exercises)
    return (
            <>
                total of {ex.reduce((s, p) => s + p)} exercises 
            </>
    )
  }

export default Total