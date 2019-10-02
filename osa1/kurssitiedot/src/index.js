import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Total = (props) => (
  <p>
    Number of exercises {props.parts
      .map(part => part.exercises)
      .reduce((acc, curr) => acc + curr)}
  </p>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.name} part={part}/>)}
    </div>
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
      <Content parts={course.parts}/>
      <Total parts={course.parts} /> 
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))