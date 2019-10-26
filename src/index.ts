import express, { response } from 'express'
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
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_body'))
app.use(bodyparser.json())

function nextId() {
  return Math.ceil(Math.random() * 1000000000)
}

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

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person.toJSON())
    })
    .catch(error => {
      console.error(error)
      res.status(404).end()
    })
})

// app.delete('/api/persons/:id', (req, res) => {
//   persons = persons.filter(person => person.id !== Number(req.params.id))
//   res.status(204).end()
// })

app.post('/api/persons', (req, res) => {
  if (!req.body)
    return response.status(400).json({ error: 'content missing' })
  const person = new Person({ ...req.body })
  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
})

// app.put('/api/persons/:id', (req, res) => {
//   let person = req.body as Person
//   const id = Number(req.params.id)
//   if (person.name) {
//     if (person.number) {
//       const index = persons.findIndex(p => p.id === id)
//       persons[index] = { ...persons[index], number: person.number }
//       res.json(persons[index])
//     } else {
//       if (persons.some(p => p.name === person.name)) {
//         res.status(400)
//         return res.json({ error: "name must be unique" })
//       } else {
//         person = { id: nextId(), name: person.name }
//         persons = persons.concat(person)
//         res.json(person)
//       }
//     }
//   } else {
//     res.status(400)
//     return res.json({ error: "missing name" })
//   }
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})