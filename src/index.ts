import * as http from 'http'

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello asdasdas')
})

const port = 3001
app.listen(port)
console.log(`Server running on ${port}`)