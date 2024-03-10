import Convo from '../models/convoModel.js';
import User from '../models/userModel.js';


//create a function that will accept a user token/identify the user
//then it will search through the list of conversations and find ones that the user is in
//then it will stitch together the convo ID and the username of the person they are chatting with
//then return this as a json body similar to how batchGetMessages sends it
export async function getConvos(req, res){
    try{
        const userID = req.user; 
        
        const convo = await Convo.find(
            { users: { $in: [userID] } }
        ).populate({
            path: 'users',
            select: 'username -_id',
            match: { _id: { $ne: userID } }
        });

        if (!convo) {
            res.status(404).send({ message: "No conversation found for the user." });
            return;
        }

        const usernames = convo.map(conversation => conversation.users[0].username);

        res.status(200).json(usernames); 

    } catch (error) {
        if (error.kind == 'ObjectId'){
            res.status(404).send({message: "There's no Conversation ID to see here"});
        }else {
            res.status(400).send({ message: error.message });
        }
    }
}

//OLD GETCONVO FUNCTION:
// export async function getConvo(req, res){
//     try{
//         const convoID = req.body.convoID;
        
//         const convo = await Convo.findOne({_id: convoID});

//         const unauthorized = !convo.users.includes(req.user._id);
//         if(unauthorized){
//             res.status(401).send({message: "Accessing Unauthorized Resources"});
//         } else {
//             res.status(201).send({ convo });
//         }
//     } catch (error) {
//         if (error.kind == 'ObjectId'){
//             res.status(404).send({message: "There's no Conversation ID to see here"});
//         }else {
//             res.status(400).send({ message: error.message });
//         }
//     }
// }

/*
post /createConvo
header -> auth: token
body -> userID: the recipient ID from the likes page 
 */
export async function createConvo(req, res){
    try{
        const userID = req.user; 
        const recipient = req.body.userID
        //confirm the user ID they sent exists
    
        const user = await User.findOne({_id: recipient});

        //add error checking to make sure the recipient also likes the user
        
        if (!user){
            return res.status(404).send({message: `Who (${userID}) you tryna contact? ${recipient} The wind?`})
        }

        const existingConvo = await Convo.findOne({
            users: { $all: [userID, recipient] }
        });
        if (existingConvo) {
            return res.status(400).send({ message: "Conversation already exists for these users." });
        }

        let convoInfo = {
            messages : [], 
            users: [userID, recipient] 
        }
        const convo = new Convo(convoInfo); 
        await convo.save(); 

        res.status(201).send(); 

    } catch (error) {
        if (error.kind == 'ObjectId'){
            res.status(404).send({message: "There's no Conversation ID to see here"});
        }else {
            res.status(400).send({ message: error.message });
        }
    }
}


