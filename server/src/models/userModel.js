import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    pictures: [String],
    DOB: Date,
    likes: { type: Map, of: String },
    dislikes: { type: Map, of: String },
    matches: { type: Map, of: String },
    randos: { type: Map, of: String },
    gender: String,
    interestedIn: [String],
    bio: String,
    interests: [String],
    resetAfter: Number
})

const User = model('User', userSchema);