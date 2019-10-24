import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-rbdb5.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

if (process.argv.length === 3) {
  Person.find({}).then(res => {
    console.log(res)
    mongoose.connection.close()
  }).catch(console.error)
} else {
  person.save().then(res => {
    console.log(res)
    console.log(`Added '${process.argv[3]}' number '${process.argv[4]}' to phonebook`)
    mongoose.connection.close()
  }).catch(console.error)
}