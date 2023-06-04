const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');


const User = require('../model/userSchema');

// router.get('/', (req, res) => {
//     res.send('<h1>Home router</h1>');
// })

router.get('/getdata', authenticate, (req, res) => {
    console.log('Get data');
    res.send(req.rootUser);
})

router.post('/server', authenticate, async (req, res) => {
    console.log('Server post');
    // console.log(req.body);
    const {sname, message} = req.body;
    console.log(sname);
    console.log(message);
    try {
        // console.log(req.body);
        const serverName = await User.findOne({_id:req.userId});
        // console.log(serverName);

        if (serverName) {
            const userMessage = await serverName.addMessage(message);
            // console.log(userMessage);
            await serverName.save();
            res.status(201).json({mess:"message sent"});
        }

    } catch (error) {
        console.log(error);
    }
})

// router.get('/contact', (req, res) => {
//     res.cookie('test', 'thapatech');
//     res.send('<h1>Contat router</h1>');
// })

// router.get('/join', (req, res) => {
//     res.send('<h1>Join router</h1>');
// })

router.post('/join', async (req, res) => {
    // console.log(req.body);

    const {sname, password} = req.body;

    if (!sname || !password) {
        return res.status(422).json({err: "Please fill info properly"});
    }

    try {
        
        const serverExits = await User.findOne({sname: sname});

        if (!serverExits) {
            return res.status(422).json({err: 'Server does not exits'});
        }
        // console.log(serverExits);

        const isMatch = await bcrypt.compare(password ,serverExits.password);

        const token = await serverExits.generateAuthToken();
        console.log(token);

        res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 10800000),
            httpOnly:true 
        });

        if (!isMatch) {
            return res.status(422).json({err: "Password is not matching"});
        }

        res.status(200).json({message: "You join server successfully"});

    } catch (error) {
        console.log(error);
    }

})

// router.get('/create', (req, res) => {
//     res.send('<h1>Create router</h1>');
// })

router.post('/create', async (req, res) => {
    console.log(req.body);

    const {sname, password, cpassword, delpassword, cdelpassword} = req.body;

    if (!sname || !password || !cpassword || !delpassword || !cdelpassword) {
        return res.status(422).json({err: 'Please fill all fields'});
    }

    if (password !== cpassword) {
        return res.status(401).json({err: "Password is not matching"});
    }
    
    try {
        
        const userExits = await User.findOne({sname : sname});

        if (userExits) {
            return res.status(409).json({err: 'Server already exits'});
        }

        const user = new User({sname, password, cpassword, delpassword, cdelpassword});

        // here we hash our passwords
        // console.log(user);

        const serverCreate = await user.save();
        // console.log(serverCreate);

        if (serverCreate) {
            res.status(201).json({message: "Server Created"});
        }

    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', authenticate, (req, res) => {
    console.log("Logout Page");
    res.clearCookie('jwtoken', {path:"/"});
    res.status(200).json({mess:"User logout"});
})

router.delete('/delete', async (req,res) => {
    console.log("Delete page");
    
    const {sname, delpassword} = req.body;
    try {
        const server = await User.findOne({sname:sname});

        if (!server) {
            return res.status(500).json({err: "Server not found"});
        }
        console.log(server);

        const isMatch = await bcrypt.compare(delpassword, server.delpassword);
        console.log(isMatch);
        if(!isMatch) {
            return res.status(401).json({err: "Password not matching"});
        }

        const delServer = await User.deleteOne({sname:sname});
        console.log(delServer);
        if (delServer) {
            return res.status(200).json({mess: "Server deleted successfully"});
        }

    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;