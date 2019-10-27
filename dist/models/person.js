"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
mongoose_1.default.set('useFindAndModify', false);
const url = process.env.MONGODB_URI;
console.log('connecting to', url);
mongoose_1.default.connect(url, { useNewUrlParser: true })
    .then(() => {
    console.log('connected to MongoDB');
})
    .catch(error => {
    console.error('error connecting to MongoDB:', error.message);
});
const personSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8
    }
});
personSchema.plugin(mongoose_unique_validator_1.default);
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.default = mongoose_1.default.model('Person', personSchema);
//# sourceMappingURL=person.js.map