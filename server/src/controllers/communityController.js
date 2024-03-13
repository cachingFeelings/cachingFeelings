import Community from '../models/communityModel.js';

export async function getPosts(req, res){
    try{
        const posts = await Community.find().sort({timeStamp: -1}).populate('author', 'username');
        if (!posts) {
            res.status(404).send({ message: "There are no posts yet :(" });
            return;
        }

        res.status(201).json(posts); 

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export async function newPosts(req, res) {
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
    
    const date = new Date(); 
    try {
        const timeStamp = new Date('2024-03-09');
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
export async function likeDislikePosts(req, res) {
    try {
        const author = req.user;
        const postID = req.body.postID;
        const userID = author._id;
        const likeStatus = req.body.like;

        const post = await Community.findById(postID);

        if (!post) {
            return res.status(404).send({ message: "Post not found." });
        }

        let update = {};
        if (likeStatus) {
            if (!post.likes.includes(userID)) {
                update.$addToSet = { likes: userID };
            } else {
                update.$pull = { likes: userID };
            }
            if (post.dislikes.includes(userID)) {
                update.$pull = { dislikes: userID };
            }
        } else {
            if (!post.dislikes.includes(userID)) {
                update.$addToSet = { dislikes: userID };
            } else {
                update.$pull = { dislikes: userID };
            }
            if (post.likes.includes(userID)) {
                update.$pull = { likes: userID };
            }
        }

        if (update.$addToSet || update.$pull) {
            const updatedPost = await Community.findOneAndUpdate(
                { _id: postID },
                update,
                { new: true }
            ).populate('author', 'username');

            res.status(201).send(updatedPost);
        } else {
            res.status(201).send(post);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
}

export async function reportPosts(req, res) {
    try {
        const postID = req.body.postID;
        const userID = req.user._id;

        const postToReport = await Community.findById(postID);

        if (!postToReport) {
            return res.status(404).send({ message: "Post not found." });
        }

        console.log(postToReport.author._id.toString());
        if (postToReport.author._id.toString() === userID) {
            return res.status(403).send({ message: "You cannot report your own post." });
        }

        const updatedPost = await Community.findOneAndUpdate(
            { _id: postID },
            { $addToSet: { reportedBy: userID } },
            { new: true }
        );

        res.status(201).send(updatedPost);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export async function deletePosts(req, res) {
    try {
        const postID = req.body.postID;
        const userID = req.user._id;

        const updatedPost = await Community.findOneAndUpdate(
            { _id: postID, author: userID },
            { $set: { hide: true } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).send({ message: "Post not found or you're not authorized to hide this post." });
        }

        res.status(201).send(updatedPost);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}



