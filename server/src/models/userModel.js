import { Schema as _Schema, model } from 'mongoose';
import pkg from 'bcryptjs';
const { hash } = pkg;


const Schema = _Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    pictures: [String],
    DOB: Date,
    likes: { type: Map, of: String },
    dislikes: [{type: Schema.Types.ObjectId, ref:"User"}],
    matches: { type: Map, of: String },
    showUsersLookingFor: {type: String},
    matchWith: {type: String},
    gender: String,
    interestedIn: [String],
    bio: String,
    interests: [String],
    resetAfter: Number
})

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await hash(this.password, 8);
    }
    next();
    }
)

const User = model('User', userSchema);

export default User;
