import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const messageSchema = new Schema({
    from: {type: Schema.Types.ObjectId, ref:"User"},
    to: {type: Schema.Types.ObjectId, ref:"User"},
    body: String,
    mediaLink: [String],
    burnMessageAfter: Number,
    seen: Boolean,
    timeStamp: Date,
    convoID: {type: Schema.Types.ObjectId, ref:"Convo"},
  });

const Message = model('Message', messageSchema);
export default Message;
