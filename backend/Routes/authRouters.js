import {Signup, Login} from '../Controllers/AuthControllers.js';
import googleAuth from '../Controllers/googleControllers.js';
import {LoginValidation, SignupValidation} from '../Middlewares/AuthValidation.js';
import express from 'express';

const router=express.Router();

router.post('/signup', SignupValidation, Signup);
router.post('/login', LoginValidation, Login);
router.get('/google', googleAuth);

export default router;

