import Community from '../models/communityModel.js';

export async function getPosts(req, res){
    try{
        const posts = await Community.find().populate('author', 'username');;
        if (!posts) {
            res.status(404).send({ message: "There are no posts yet :(" });
            return;
        }

        res.status(200).json(posts); 

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export async function newPost(req, res){
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