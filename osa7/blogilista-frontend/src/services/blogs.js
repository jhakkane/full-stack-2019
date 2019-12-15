import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = (blog) => {
  const config = { headers: { Authorization: token } }
  return axios.
    post(baseUrl, blog, config).
    then(response =>
      response.data
    )
}

const removeBlog = (id) => {
  const config = { headers: { Authorization: token } }
  const url = `${baseUrl}/${id}`
  return axios.
    delete(url, config)
}

const updateBlog = (id, blog) => {
  const config = { headers: { Authorization: token } }
  const url = `${baseUrl}/${id}`
  return axios.
    put(url, blog, config).
    then(response =>
      response.data
    )
}

const addComment = (id, comment) => {
  const config = { headers: { Authorization: token } }
  const url = `${baseUrl}/${id}/comments`
  return axios.
    post(url, comment, config).
    then(response =>
      response.data
    )
}

export default { addComment,
  createNew,
  getAll,
  removeBlog,
  setToken,
  updateBlog }