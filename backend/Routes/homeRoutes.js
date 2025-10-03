import express from 'express';
import { checkAuth } from '../Middlewares/Auth.js'

const router=express.Router(); 

router.get('/', checkAuth, (req, res) => {
    return res.json({id:req.user._id, email:req.user.email, type:req.user.type})
});

export default router;