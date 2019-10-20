import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Total = (props) => (
  <p><b>
    total of {props.parts
      .map(part => part.exercises)
      .reduce((acc, curr) => acc + curr)} courses
  </b></p>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.name} part={part}/>)}  
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} /> 
    </div>
  )
}

export default Course