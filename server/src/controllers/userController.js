import User from '../models/userModel.js';
import pkg from 'jsonwebtoken';
import bcpkg from 'bcryptjs'
const {sign} = pkg;
const {compare} = bcpkg;


// TODO:
// Return only the required data for each request
export async function createUser(req, res) {
    try {
        // Only the username & pass - rest of the fields added as onboarding
        const { username, password } = req.body;
        const user = new User({ username, password });

        // Add to DB
        await user.save();

        // Generate a JWT for the user
        const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).send({ userObj, token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export async function getUserData(req, res){
    try{
        const userID = req.body._id;
        const user = await User.findOne({_id: userID}, '-password');

        if (!user){
            return res.status(404).send({message: "Who you tryna contact? The wind?"})
        }

        res.status(201).send({ user });
    } catch {
        res.status(400).send({ message: error.message });
    }
}


export async function login(req, res){
    try{
        const { username, password } = req.body;
        

        const user = await User.findOne({username});
        if (!user){
            return res.status(404).send({message: "You don't exist...yet."})
        }
        
        // Compare input pass with stored pass hash
        const passGood = await compare(password, user.password);
        if (!passGood){
            return res.status(401).send({message: "That ain't gonna work here chief"})
        }
        
        // Generate a JWT for the user
        const token = sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).send({ userObj, token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export async function getMatches(req, res){
    try{
        const user = req.user;
        const token = req.token;
        
        const userInterests = user.interests;
        
        const pipeline = [
            { 
                $match: { _id: { $ne: user._id} } 
            },
            { 
                $project: {
                    username: 1,
                    interests: 1,
                    commonInterestsCount: { $size: { $setIntersection: ["$interests", userInterests] } },
            }},
            {
                $sort: {commonInterestsCount: -1}
            },
            { 
                $limit: 30 
            }
        ];
        
        const listUsers = await User.aggregate(pipeline);
        
        res.status(201).send({ listUsers });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}



export async function batchCreateUser(req, res) {
    try {
        // Only the username & pass - rest of the fields added as onboarding
        for (let item of req.body){
            console.log(item)
            const { username, password, interests } = item;
            const user = new User({ username, password, interests });    
            await user.save();
        }

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}