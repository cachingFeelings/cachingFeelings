import Message from '../models/messageModel.js'
import Convo from '../models/convoModel.js'

export async function batchGetMessages(req, res){
    try{
        const messageList = await Message.find({
            convoID : req.query.convoID,  
            $or: [ 
                { burnAfterRead: { $ne: true } }, 
                { seen: { $ne: true } }
            ]
        }).sort({ timeStamp: 1 });
        
        res.status(201).send({ messageList });
    } catch (error) {
        if (error.kind == 'ObjectId' || error.name === 'CastError'){
            res.status(404).send({message: "Invalid Message IDs provided"});
        }else {
            res.status(400).send({ message: error.message });
        }
    }
}

export async function getMessages(req, res){
    try{
        const userID = req.user._id;
        const messageId = req.body.messageID;
        const message = await Message.findOne({ _id : messageId });
        
        const unauthorized = !message.to.equals(userID) && !message.to.equals(userID);
        
        if(unauthorized){
            res.status(401).send("Accessing Unauthorized Resources");
        } else if (message.burnAfterRead && message.seen){
            throw new Error("User has already seen the message")
        } else {
            res.status(201).send({ message });
        }
    } catch (error) {
        if (error.kind == 'ObjectId' || error.name === 'CastError'){
            res.status(404).send({message: "Invalid Message IDs provided"});
        }else {
            res.status(400).send({ message: error.message });
        }
    }
}

export async function postMessage(req, res){
    try{

        if( !req.body.body && (!req.body.mediaLink || req.body.mediaLink.length == 0 )){
            throw new Error("Message cannot be empty - at least need a body and a ")
        }

        const convo = await Convo.findOne({_id: req.body.convoID});

        if(!convo){
            return res.status(404).send({message: "Convo Id Not Found"});
        }

        const messageInfo = {
            from: req.user._id,
            burnAfterRead: req.body.burnAfterRead ? req.body.burnAfterRead : false,
            seen: false,
            mediaLink: req.body.mediaLink ? req.body.mediaLink : [],
            timeStamp : new Date(),
            convoID : convo._id
        }

        if(req.body){
            messageInfo.body = req.body.body
        }

        if(req.body.mediaLink && req.body.mediaLink.length > 0){
            messageInfo.mediaLink = req.body.mediaLink
        }

        const message = new Message(messageInfo);

        await message.save();

        convo.messages.push(message._id.toString());

        await convo.save();

        res.status(201).send(message);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export async function updateSeen(req, res){
    try{
        const messageId = req.body.messageID;
        const message = await Message.findOne({ _id : messageId });
        const userID = req.user._id;

        const unauthorized = !message.to.equals(userID);
        if(unauthorized){
            res.status(401).send("Accessing Unauthorized Resources");
        }else {
            if (message.seen){
                throw new Error("Already Marked Seen");
            }
            message.seen = true;
            await message.save();
            
            res.status(201).send({ message });
        }
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }

}

export async function deleteMessage(req, res){
    try{
        const messageId = req.body._id;
        await Message.deleteOne({ _id: messageId });

        res.status(201).send("Delete successful");
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }

}
