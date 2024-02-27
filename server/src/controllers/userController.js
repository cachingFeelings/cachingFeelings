import User from '../models/userModel.js';
import pkg from 'jsonwebtoken';
import bcpkg from 'bcryptjs'
const {sign} = pkg;
const {compare} = bcpkg;


// TODO:
// Return only the required data for each request
export async function createUser(req, res) {
    try {
        // Make sure we have the minimum requirements
        if (!req.body.data.username || !req.body.data.password) {
            console.log("didn't provide username and password")
            return res.status(400).send({ message: "Username and password are required." });
        }

        let userInfo = {
            username: req.body.data.username,
            password: req.body.data.password,
        }

        const optionalFields = ['DOB', 'showUsersLookingFor', 'matchWith', 'gender', 'interestedIn', 'bio', 'interests'];
        optionalFields.forEach(field => {
            if (req.body.data[field]) userInfo[field] = req.body.data[field];
        });

        // Create new User Object
        const user = new User(userInfo);

        // Save to DB
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
        
        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).send({ userObj });
    } catch (error) {
        if (error.kind == 'ObjectId'){
            res.status(404).send({message: "Who you tryna contact? The wind?"});
        }else {
            res.status(400).send({ message: error.message });
        }
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

export async function validUsername(req, res) {
    try {
        const { username } = req.body; 

        const user = await User.findOne({username});
        console.log(`The username: ${username} was found: ${user}`)
        if (user){
            return res.status(409).send({message: "Already taken"})
        }
        else {
            return res.status(200).send({message: "Username is available"}); 
        }
    }
    catch (error) {
        res.status(400).send({message: error.message})
    }
}

export async function modifyUser(req, res){
    try{
        const user = req.user;
        const token = req.token;
        const updates = req.body;
        
        if(updates.password && updates.currentPassword){
            const passGood = await compare(updates.currentPassword, user.password);
            if (!passGood){
                return res.status(401).send({message: "That ain't gonna work here chief"})
            }
        } else if (updates.password) {
            return res.status(400).send({ message: 'You gotta provide the current password' });
        }

        Object.keys(updates).forEach((key) => {
            if (key != 'currentPassword'){
                user[key] = updates[key];
            }
        });

        await user.save();

        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).send({ userObj, token });

    } catch{

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

// export async function startConvo(req, res){
//     try{
//         const user = req.user;
//         const token = req.token;
        
//         const otherUserID = await User.findOne({_id: req._id});
        

//         res.status(201).send({ listUsers });
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//     }
// }

// export async function addMessage(){

// }

// export async function changeStatus(req, res){

// }

// export async function batchCreateUser(req, res) {
//     try {
//         // Only the username & pass - rest of the fields added as onboarding
//         for (let item of req.body){
//             console.log(item)
//             const { username, password, interests } = item;
//             const user = new User({ username, password, interests });    
//             await user.save();
//         }

//         res.status(201).send({ user, token });
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//     }
// }
