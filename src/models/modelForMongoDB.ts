import mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema({
    id: {type: Number, required: false},
    text: {type: String, required: true},
    checked: {type: Boolean, required: false},
});

const userSchema = new mongoose.Schema({
    login: { type: String, required: true},
    pass: { type: String, required: true },
    items: {type: [taskSchema], require: false}
});

export default mongoose.model('User', userSchema);
