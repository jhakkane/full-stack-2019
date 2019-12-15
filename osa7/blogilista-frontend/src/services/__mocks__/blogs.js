const blogs = [
  {
    id: 1,
    title: 'Coding in Javascript',
    author: 'Simo Salminen',
    url: 'www.yle.fi',
    likes: 200,
    user: {
      username: 'Spede'
    }
  },
  {
    id: 2,
    title: 'Coding',
    author: 'Sami Salminen',
    url: 'www.yle.fi',
    likes: 1
  },
]

const getAll = async () => {
  return Promise.resolve(blogs)
}

const setToken = () => {}

export default { getAll,
  setToken }