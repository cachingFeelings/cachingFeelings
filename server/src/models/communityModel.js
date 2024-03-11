import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const communitySchema = new Schema({
    author : {type: Schema.Types.ObjectId, ref:"User"},
    title : String,
    body : String,
    likes : [{type: Schema.Types.ObjectId, ref:"User"}],
    dislikes : [{type: Schema.Types.ObjectId, ref:"User"}],
    timeStamp : Date, 
    reportedBy : [{type: Schema.Types.ObjectId, ref:"User"}],
    hide : Boolean
  });

const Community = model('Community', communitySchema);
export default Community;
