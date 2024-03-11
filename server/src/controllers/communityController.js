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

export async function testDate(req, res){
    function formatDate(date) {
        const currentDate = new Date();
        const timestamp = date.getTime();
        const currentTimestamp = currentDate.getTime();
        const difference = currentTimestamp - timestamp;
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) {
            return `${days} day${days === 1 ? '' : 's'} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        }
    }
    
    const date = new Date(); // Your date here
    try {
        const timeStamp = new Date('2024-03-09');
        // const readable = timeStamp.toLocaleDateString();
        const readable = formatDate(timeStamp)
        res.status(200).send(
            {
                timeStamp: timeStamp,
                readable: readable
            }
            );
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }

}
