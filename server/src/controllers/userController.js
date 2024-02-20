import User from '../models/userModel.js';
import pkg from 'jsonwebtoken';
import bcpkg from 'bcryptjs'
const {sign} = pkg;
const {compare} = bcpkg;

// helper function
function retCurrUserData(user){
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject._id;
}

// TODO:
// Return only the required data
export async function createUser(req, res) {
    try {
        // Only the username & pass - rest of the fields added as onboarding
        const { username, password } = req.body;
        const user = new User({ username, password });
        
        // Add to DB
        await user.save();

        // Generate a JWT for the user
        const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export async function login(req, res){
    try{
        const { usernmae, password } = req.body;

        // Search for user in db
        const user = await User.findOne({usernmae});
        if (!user){
            return res.status(404).send({message: "You don't exist...yet."})
        }
        
        // Compare input pass with stored pass hash
        const passGood = await compare(password, user.password);
        if (!passGood){
            return res.status(401).send({message: "That ain't gonna work here chief"})
        }

        // Generate a JWT for the user
        const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}
