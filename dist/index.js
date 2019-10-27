"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//eslint-disable-next-line
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const person_1 = __importDefault(require("./models/person"));
morgan_1.default.token('post_body', (req) => {
    return req.headers['content-type'] && req.headers['content-type'].includes('application/json') ? JSON.stringify(req.body) : '';
});
const app = express_1.default();
app.use(express_1.default.static('build'));
app.use(body_parser_1.default.json());
app.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms :post_body'));
app.use(cors_1.default());
app.get('/info', (req, res) => {
    person_1.default.find({})
        .then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
    });
});
app.get('/api/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
app.get('/api/persons', (req, res) => {
    person_1.default.find({})
        .then(persons => {
        res.json(persons.map(person => person.toJSON()));
    })
        .catch(err => {
        console.error(err);
        res.status(500).end();
    });
});
app.get('/api/persons/:id', (req, res, next) => {
    person_1.default.findById(req.params.id)
        .then(person => {
        if (person)
            res.json(person.toJSON());
        else
            res.status(404).end();
    })
        .catch(error => next(error));
});
app.delete('/api/persons/:id', (req, res, next) => {
    person_1.default.findByIdAndRemove(req.params.id)
        .then(() => {
        res.status(204).end();
    })
        .catch(error => next(error));
});
app.post('/api/persons', (req, res, next) => {
    if (!req.body)
        return res.status(400).json({ error: 'content missing' });
    const person = new person_1.default(Object.assign({}, req.body));
    person.save()
        .then(savedPerson => {
        res.json(savedPerson.toJSON());
    })
        .catch(error => next(error));
});
app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    };
    if (person.name) {
        if (person.number) {
            person_1.default.findByIdAndUpdate(req.params.id, person, { new: true, context: 'query', runValidators: true })
                .then(updatedPerson => {
                if (updatedPerson)
                    res.json(updatedPerson.toJSON());
                else
                    res.status(404).send();
            })
                .catch(error => next(error));
        }
        else {
            new person_1.default(Object.assign({}, req.body)).save()
                .then(savedPerson => {
                res.json(savedPerson.toJSON());
            })
                .catch(error => next(error));
        }
    }
    else {
        res.status(400);
        return res.json({ error: 'missing name' });
    }
});
function unknownEndpoint(request, response) {
    response.status(404).send({ error: 'unknown endpoint' });
}
app.use(unknownEndpoint);
function errorHandler(error, request, response, next) {
    console.error(error.message);
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message.split('\n')[0] });
    }
    next(error);
}
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
//# sourceMappingURL=index.js.map