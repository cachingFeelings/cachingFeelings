import { ALL } from 'dns';
import User from '../models/userModel';
import { sign } from 'jsonwebtoken';

export async function signUp(req, res) {
    try {
        // const { email, password } = req.body;
        // const user = new User({ email, password });
        // await user.save();

        // // Generate a JWT for the user
        // const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const user = "abc"
        const token = "ahaha"
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}
