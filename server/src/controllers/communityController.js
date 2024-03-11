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

export async function newPosts(req, res){
    try{
        const postInfo = {
            author: req.user,
            body: req.body.body, 
            timeStamp : new Date()
        }

        const post = new Community(postInfo);

        await post.save();

        res.status(201).send(post); 

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}