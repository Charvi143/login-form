import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    let auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({message: "Unauthorized, jwt token is required!"})
    }
    try {
        let decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch {
        res.status(404).json({message: 'Unauthorized, JWT token wrong or expired'})
    }
}