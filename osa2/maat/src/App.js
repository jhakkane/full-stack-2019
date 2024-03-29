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
    let matches = countries.filter(country => 
      country.name.toLowerCase().includes(query.toLowerCase()))
    if (matches.length !== 1) {
      setWeather({})
    } else {
      const capital = matches[0].capital
      let url = `http://api.weatherstack.com/current?access_key=API_KEY_HIDDEN&units=m&query=${capital}`
      axios
        .get(url)
        .then(response => {
          const data = response.data.current
          let newWeather = {
            temp: data.temperature,
            windSpeed:  data.wind_speed,
            windDir:  data.wind_dir,
            icon: data.weather_icons[0]
          }
          setWeather(newWeather)
        })
        .catch(() => {
          setWeather({})
        })
    }
  }, [query, countries])

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
      <img src={weather.icon} alt="icon"/>
      <p>wind: {weather.windSpeed} kph direction {weather.windDir}</p>
    </div>
  )}

  const getMatches = () => {
    return countries.filter(country => 
      country.name.toLowerCase().includes(query.toLowerCase()))
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
