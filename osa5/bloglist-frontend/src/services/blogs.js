import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = blog => {
  const config = { headers: { Authorization: token } }
  console.log(config)
  return axios
    .post(baseUrl, blog, config)
    .then(response =>
      response.data  
    )
}

export default { createNew, getAll, setToken }