require('dotenv').config()
const jwt = require('jsonwebtoken')
const { ApolloServer, AuthenticationError, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
mongoose.set('useFindAndModify', false);

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type Author {
    bookCount: Int,
    born: Int
    name: String!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    me: User
    bookCount: Int!
    authorCount: Int!
  }
`

const assertUserIsLoggedIn = (context) => {
  const currentUser = context.currentUser
  if (!currentUser) {
    throw new AuthenticationError("not authenticated")
  }
}

const tryToSave = async (object, args) => {
  try {
    await object.save()
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
}

const getOrCreateAuthor = async (name) => {
  const existingAuthor = await Author.findOne({name: name})
  if (!existingAuthor) {
    const newAuthor = new Author({name})
    await tryToSave(newAuthor, name)
  } else {
    return existingAuthor
  }
}

const resolvers = {
  Author: {
    bookCount: (root) => Book.count({'author': root.id})
  },
  Mutation: {
    addBook: async (root, args, context) => {
      assertUserIsLoggedIn(context)
      console.log(context)

      const author = await getOrCreateAuthor(args.author)
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })

      await tryToSave(book, args)
      return book
    },
    editAuthor: async (root, args, context) => {
      assertUserIsLoggedIn(context)

      const author = await Author.findOne({name: args.name})
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await tryToSave(author, args)
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Query: {
    allAuthors: () => Author.find({}),
    allBooks: (root, args) => getBooks(root, args),
    bookCount: () => Book.count({}),
    authorCount: () =>  Author.count({}),
    me: (root, args, context) => context.currentUser
  }
}

const getBooks = async (root, args) => {
  const query = {}
  if (args.genre) {
    query.genres = {$in: [args.genre]} 
  }
  if (args.author) {
    const author = await Author.findOne({name: args.author})
    if (!author) {
      return []
    } else {
      query.author = author._id
    }
  }
  
  return Book
    .find(query)
    .populate('author')
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})