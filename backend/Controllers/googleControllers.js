import axios from 'axios'
import jwt from 'jsonwebtoken'; 
import oauth2Client from '../utils/googleClient.js'

import { UserModel } from '../Models/Users.js'; 

const googleAuth = async (req, res, next) => {
    const code = req.query.code;
    console.log("code: ", code);
    try{
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;
        //add in database now
        let user = await UserModel.findOne({ email });
        if (!user) {
            user = await UserModel.create({
                name,
                email,
                image: picture,
                type: "google",
            });
            user = await user.save();
        }
        const { _id } = user;
        const jwtToken = jwt.sign(
                    {email, _id, type:"google"},
                    process.env.JWT_SECRET,
                    {expiresIn: '24h'}
                );
        return res.status(201)
            .json({success:true, message: 'SignUp successfull', jwtToken, user});

    }catch(err){
        console.error("Error Google: ", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export default googleAuth
