import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  function avg() {
    return (good - bad)/(total())
  }

  function posPros() {
    return good/(total())*100 + ' %'
  }

  function total() {
    return good + neutral + bad;
  }

  if (total() > 0) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total()} />
          <Statistic text="average" value={avg()} />
          <Statistic text="positive" value={posPros()} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div> 
        <p>no feedback given</p>
      </div>
    )
  }

}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} handleClick={() => setGood(good + 1)} />
      <Button text={'neutral'} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={'bad'} handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)