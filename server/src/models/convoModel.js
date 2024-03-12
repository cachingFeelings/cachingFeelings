import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const convoSchema = new Schema({
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  });

const Convo = model('Convo', convoSchema);
export default Convo;
