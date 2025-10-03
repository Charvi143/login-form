import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../Models/Users.js';

const Signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if (user){
            if (user.type == "google" && !user.password) {
                return res.status(409)
                    .json({success:false, message:'Please Login this email via Google.'});
            }
            return res.status(409)
                .json({success:false, message:'User is already exist. You can login'});
        }
        const userModel = new UserModel({name, email, password, type})
        userModel.password = await bcrypt.hash(password, 10);
        const User = await userModel.save();
        const jwtToken = jwt.sign(
            {email, _id:User._id, type:"local"},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        return res.status(201)
            .json({success:true, message: 'SignUp successfull', jwtToken})
    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({success:false, message:'Internal Server Error'})
    }
}

const Login = async (req, res) => {
    try {
        const {email, password}=req.body;
        const user = await UserModel.findOne({email});
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user){
            return res.status(409)
                    .json({success:false, message:"This email is not registered"});
        }
        if(user.type == "google" && !user.password) {
            return res.status(409)
                .json({success:false, message:'Please Login this email via Google.'});
            }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual){
            return res.status(403)
                    .json({success:false, message:errorMsg});
        }
        const jwtToken = jwt.sign(
            {email, _id:user._id, type:"local"},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        return res.status(200)
            .json ({success:true, message:'Login Success', jwtToken, email, name:user.name});

        } catch (err) {
            return res.status(500)
                .json({success:false, message:'Internal Server Error'})
        }
    }


    
export {Login, Signup};
