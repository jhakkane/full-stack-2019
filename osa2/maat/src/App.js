import React, { useState, useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    let matches = getMatches()
    if (matches.length !== 1) {
      setWeather({})
    } else {
      let capital = matches[0].capital
      let url = `http://api.apixu.com/v1/current.json?key=8ae33729efe54d79837155038190607&q=${capital}`
      axios
        .get(url)
        .then(response => {
          let newWeather = {
            temp: response.data.current.temp_c,
            windSpeed:  response.data.current.wind_kph,
            windDir:  response.data.current.wind_dir,
            icon: response.data.current.condition.icon
          }
          setWeather(newWeather)
        })
    }
  }, [query])

  const queryChange = (event) => {
    setQuery(event.target.value)
  }

  const languages = (country) => {
    return country.languages
      .map(lang => <li key={lang.iso639_1}>{lang.name}</li>)
  }

  const CountryElement = ({country}) => (
    <li>
      <span>
        {country.name}
      </span>
      <button onClick={() => {setQuery(country.name)}}>
        show
      </button>
    </li>
  )

  const CountryInfo = ({country}) => {
    return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {languages(country)}
      </ul>
      <div>
        <img alt="flag" src={country.flag} style={{maxWidth: '200px', maxHeight: '200px'}}/>
      </div>
      <h3>weather in {country.capital}</h3>
      <p>temperature: {weather.temp} Celsius</p>
      <img src={weather.icon} />
      <p>wind: {weather.windSpeed} kph direction {weather.windDir}</p>
    </div>
  )}

  const getMatches = () => {
    return (countries.filter(country => 
      country.name.toLowerCase().includes(query.toLowerCase())))
  }

  const showCountries = () => {
    let matches = getMatches()
    if (matches.length > 10) {
      return <p>too many matches, specify another filter</p>
    } else if (matches.length === 1) {
      let country = matches[0]
      return <CountryInfo country={country} />
    } else if (matches.length === 0) {
      return <p>found nothing</p>
    } else {
      return (
        <ul>
          {matches.map(country => 
            <CountryElement key={country.alpha3Code} country={country} />)}
        </ul>
      )
    }
  }

  return (
    <div>
      <p>
        find countries 
        <input value={query} onChange={queryChange}/>
      </p>
      {showCountries()}
    </div>
  )
}

export default App;
