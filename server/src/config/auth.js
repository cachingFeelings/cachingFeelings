import pkg from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const verify = pkg.verify;

const secretKey = process.env.JWT_SECRET;

export const decodeJWT = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = verify(token, secretKey);
        const user = await User.findOne({ _id: decoded._id});

        if (!user) {
          throw new Error();
        }
        
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};
