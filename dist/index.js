"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
morgan_1.default.token('post_body', (req, res) => {
    return req.headers["content-type"] === "application/json" ? JSON.stringify(req.body) : "";
});
const app = express_1.default();
app.use(cors_1.default());
app.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms :post_body'));
app.use(body_parser_1.default.json());
let persons = [
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "rwarin",
        "number": "aisfpasn",
        "id": 5
    },
    {
        "name": "asd",
        "number": "321",
        "id": 6
    }
];
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
    res.json(persons);
});
app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(person => person.id === Number(req.params.id));
    if (person)
        res.json(person);
    else
        res.status(404).end();
});
app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(person => person.id !== Number(req.params.id));
    res.status(204).end();
});
app.post('/api/persons', (req, res) => {
    const person = req.body;
    person.id = nextId();
    persons = persons.concat(person);
    res.json(person);
});
app.put('/api/persons/:id', (req, res) => {
    let person = req.body;
    const id = Number(req.params.id);
    if (person.name) {
        if (person.number) {
            const index = persons.findIndex(p => p.id === id);
            persons[index] = Object.assign(Object.assign({}, persons[index]), { number: person.number });
            res.json(persons[index]);
        }
        else {
            if (persons.some(p => p.name === person.name)) {
                res.status(400);
                return res.json({ error: "name must be unique" });
            }
            else {
                person = { id: nextId(), name: person.name };
                persons = persons.concat(person);
                res.json(person);
            }
        }
    }
    else {
        res.status(400);
        return res.json({ error: "missing name" });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
//# sourceMappingURL=index.js.map