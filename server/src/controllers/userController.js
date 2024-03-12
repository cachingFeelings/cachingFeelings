import User from '../models/userModel.js';
import Convo from '../models/convoModel.js';
import pkg from 'jsonwebtoken';
import bcpkg from 'bcryptjs'
const {sign} = pkg;
const {compare} = bcpkg;

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

export async function likeDislike(req,res){ 
    try{
        const targetUserID = req.body._id;
        const like = req.body.like;

        const user = req.user;

        const targetUser = await User.findOne({_id: targetUserID});
        
        if (!targetUser){
            return res.status(404).send({message: "Who you tryna contact? The wind?"})
        }
        if(!user.likes){
            user["likes"] = {}
        }
        if(!user.dislikes){
            user["dislikes"] = []
        }
        if (like){
            if (user.likes.has(targetUserID)){
                return res.status(400).send({ message: "User already liked." });
            } else {
                user.likes.set(targetUserID, "");
            }
        }else {
            if (user.dislikes.includes(targetUserID)) {
                return res.status(400).send({ message: "User already disliked." });
            } else {
                user.dislikes.push(targetUserID);
            }
        }
        var matchCheck = false;
        if (like && targetUser.likes && targetUser.likes.has(user._id.toString())){

            if(!user.matches){
                user["matches"] = {}
            }
            if(!targetUser.matches){
                targetUser["matches"] = {}
            }
            user.matches.set(targetUserID, "");
            targetUser.matches.set(user._id, "");
            
            await targetUser.save();
            matchCheck = true;
        }

        await user.save();

        res.status(201).send({ 
            message: "Great Success",
            isMatch: matchCheck
        });
    } catch (error) {
        if (error.kind == 'ObjectId'){
            res.status(404).send({message: "Who you tryna contact? The wind?"});
        }else {
            res.status(400).send({ message: error.message });
        }
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

export async function getInterestMatches(req, res){
    try{
        const user = req.user;
        const token = req.token;
        
        const userInterests = user.interests;
        if(!user.likes){
            user["likes"] = {}
        }
        if(!user.dislikes){
            user["dislikes"] = []
        }
        const likedUsers = Array.from(user.likes.keys());
        const dislikedUsers = user.dislikes;

        const excludedUsers = [...likedUsers, ...dislikedUsers, user._id];

        const pipeline = [
            { 
                $match: { _id: { $nin: excludedUsers}} 
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

export async function getLikes(req, res){
    try{
        const user = req.user;

        if(!user.likes){
            user["matches"] = {}
        }
        
        const userIDs = Array.from(user.matches.keys());

        const likedUsers = await User.find({
            '_id' : {$in: userIDs}   
        }, '_id username interests likes')


        const userID = user._id

        const listUsers = likedUsers.filter(likedUser => {
            return likedUser.likes && likedUser.likes.has(user._id.toString());
        });

        
        res.status(201).send({ listUsers });

    } catch (error) {
        if (error.kind == 'ObjectId'){
            res.status(404).send({message: "Who you tryna contact? The wind?"});
        }else {
            res.status(400).send({ message: error.message });
        }
    }
}

export async function getCurrentUserId(req, res) {
    try {
        const _id = req.user._id;
        res.status(200).send({ _id });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export async function getFinally(req, res){
    try{
        const user = req.user;

        if (!user.matches){
            user["matches"] = {}
        }
        const matches = user.matches;
        
        const filteredMapUsers = {};
        
        matches.forEach((convoID, userID) => {
            if (convoID) { 
                filteredMapUsers[userID] = convoID;
            }
        });
        
        res.status(201).send({ mapUsers: filteredMapUsers });
    } catch (error) {
        if (error.kind == 'ObjectId'){
            res.status(404).send({message: "Who you tryna contact? The wind?"});
        }else {
            res.status(400).send({ message: error.message });
        }
    }
}

export async function blockUser(req, res){
    try{
        const currUser = req.user; 
        const userToBlock = req.body.username; 
        const user = await User.findOne({ username : userToBlock });
        const usertoblockID = user._id

        await Convo.deleteOne({ users: { $all: [currUser._id, usertoblockID] } });


        await User.findByIdAndUpdate(currUser._id, { $unset: { [`likes.${usertoblockID}`]: 1 } });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}
