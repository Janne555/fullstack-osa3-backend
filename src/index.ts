import express, { Response, NextFunction, Request } from 'express'
import bodyparser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import Person from './models/person'

morgan.token('post_body', (req, res) => {
  return req.headers["content-type"] && req.headers["content-type"].includes("application/json") ? JSON.stringify(req.body) : ""
})

const app = express()
app.use(express.static('build'))
app.use(bodyparser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_body'))
app.use(cors())

app.get('/info', (req, res) => {
  Person.find({})
    .then(persons => {
      res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
    })
})

app.get('/api/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
    .catch(err => {
      console.error(err)
      res.status(500).end()
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person)
        res.json(person.toJSON())
      else
        res.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(resukt => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  if (!req.body)
    return res.status(400).json({ error: 'content missing' })
  const person = new Person({ ...req.body })
  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const person: Person = {
    name: req.body.name,
    number: req.body.number
  }

  if (person.name) {
    if (person.number) {
      Person.findByIdAndUpdate(req.params.id, person, { new: true, context: 'query', runValidators: true })
        .then(updatedPerson => {
          res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
    } else {
      new Person({ ...req.body }).save()
        .then(savedPerson => {
          res.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
    }
  } else {
    res.status(400)
    return res.json({ error: "missing name" })
  }
})

function unknownEndpoint(request: Request, response: Response) {
  response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
  console.error(error.message)
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" })
  }

  if (error.name === "ValidationError" && error.message.includes("unique")) {
    return response.status(400).send({ error: "name must be unique" })
  }
  
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})