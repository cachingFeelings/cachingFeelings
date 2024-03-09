import Message from '../models/messageModel.js'

export async function batchGetMessages(req, res){
    try{
        const userID = req.user._id;

        const messageIdList = req.body.messageIDs;
        const messageList = await Message.find({
            _id : { $in: messageIdList }, 
            $or: [ 
                { burnMessageAfter: { $ne: true } }, 
                { seen: { $ne: true } }
            ]
        }).sort({ timeStamp: 1 });
        
        const unauthorized = messageList.some(message => !message.to.equals(userID) && !message.to.equals(userID));
        
        if(unauthorized){
            res.status(401).send("Accessing Unauthorized Resources");
        } else {
            res.status(201).send({ messageList });
        }
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

export async function sendMessage(req, res){
    try{
        if( !req.body && (!req.body.mediaLink || req.body.mediaLink.length == 0 )){
            throw new Error("Message cannot be empty - at least need a body and a ")
        }
        const messageInfo = {
            from: req.user._id,
            to: req.body.to,
            burnMessageAfter: req.body.burnMessageAfter? req.body.burnMessageAfter : false,
            seen: req.body.seen? req.body.seen : false,
            timeStamp : new Date(),
            convoID : req.user.matches[req.to]
        }

        if(req.body){
            messageInfo.body = req.body.body
        }

        if(req.body.mediaLink && req.body.mediaLink.length > 0){
            messageInfo.mediaLink = req.body.mediaLink
        }

        const message = new Message(messageInfo);

        await message.save();

        res.status(201).send({ message });
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
            message.seen = true;
            await message.save();
            
            res.status(201).send({ message });
        }
    }
    catch (error) {

    }

}
