import Message from '../models/messageModel.js'

export async function batchGetMessages(req, res){
    try{
        const userID = req.user._id;
        
        const messageIdList = req.messageIDs;
        const messageList = await Message.find({
            _id : { $in: messageIdList }, 
            $or: [ 
                { burnMessageAfter: { $ne: true } }, 
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
        const messageId = req.messageID;
        const message = await Message.findOne({ _id : messageId });
        
        res.status(201).send({ message });
    } catch (error) {
        if (error.kind == 'ObjectId' || error.name === 'CastError'){
            res.status(404).send({message: "Invalid Message IDs provided"});
        }else {
            res.status(400).send({ message: error.message });
        }
    }
}

