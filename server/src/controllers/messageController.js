import Message from '../models/messageModel.js'
import Convo from '../models/convoModel.js'

export async function batchGetMessages(req, res){
    try{
        const userID = req.user._id;

        const messageIdList = req.body.messageIDs;
        console.log(req.body);
        const messageList = await Message.find({
            convoID : req.body.convoID, //{ $in: messageIdList }, 
            $or: [ 
                { burnAfterRead: { $ne: true } }, 
                { seen: { $ne: true } }
            ]
        }).sort({ timeStamp: 1 });
        
        //REMOVE AFTER TESTING
        const unauthorized = false//messageList.some(message => !message.to.equals(userID) && !message.from.equals(userID));
        
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

export async function postMessage(req, res){
    try{
        //ask about this
        if( !req.body && (!req.body.mediaLink || req.body.mediaLink.length == 0 )){
            throw new Error("Message cannot be empty - at least need a body and a ")
        }

        //No longer need this?
        // const thisConvoID = req.user.matches.get(req.body.to);
        // if (!thisConvoID){
        //     throw new Error("You have to match with the user first");
        // }

        const convo = await Convo.findOne({"_id": req._id});

        if(!convo){
            return res.status(404).send({message: "Convo Id Not Found"});
        }

        const messageInfo = {
            from: req.user._id,
            to: req.body.to,
            burnAfterRead: req.body.burnAfterRead ? req.body.burnAfterRead : false,
            seen: req.body.seen? req.body.seen : false,
            timeStamp : new Date(),
            convoID : thisConvoID
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
