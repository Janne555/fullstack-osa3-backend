"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const person_1 = __importDefault(require("./models/person"));
morgan_1.default.token('post_body', (req, res) => {
    return req.headers["content-type"] && req.headers["content-type"].includes("application/json") ? JSON.stringify(req.body) : "";
});
const app = express_1.default();
app.use(express_1.default.static('build'));
app.use(cors_1.default());
app.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms :post_body'));
app.use(body_parser_1.default.json());
function nextId() {
    return Math.ceil(Math.random() * 1000000000);
}
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for 4 people</p><p>${new Date()}</p>`);
});
app.get('/api/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
app.get('/api/persons', (req, res) => {
    person_1.default.find({})
        .then(persons => {
        console.log(persons.map(person => person.toJSON()));
        res.json(persons.map(person => person.toJSON()));
    })
        .catch(err => {
        console.error(err);
        res.status(500).end();
    });
});
app.get('/api/persons/:id', (req, res) => {
    person_1.default.findById(req.params.id)
        .then(person => {
        express_1.response.json(person.toJSON());
    });
});
// app.delete('/api/persons/:id', (req, res) => {
//   persons = persons.filter(person => person.id !== Number(req.params.id))
//   res.status(204).end()
// })
app.post('/api/persons', (req, res) => {
    if (!req.body)
        return express_1.response.status(400).json({ error: 'content missing' });
    const person = new person_1.default(Object.assign({}, req.body));
    person.save()
        .then(savedPerson => {
        res.json(savedPerson.toJSON());
    });
});
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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
//# sourceMappingURL=index.js.map