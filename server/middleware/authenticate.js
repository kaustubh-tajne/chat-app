const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
require('cookie-parser');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        console.log("VerifyToken: ");
        // console.log(verifyToken);

        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token": token});

        console.log("RootUser: ");
        
        // console.log(rootUser);

        if (!rootUser) {
            return res.status(500).json({err:"User not found"});
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).send('unauthorized');
    }
    
}

module.exports = Authenticate;