import jwt from 'jsonwebtoken';

// middleware to protect routes
export const authMiddleware = (req, res, next) => {
    try{
        // get the token from the header
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message : 'no token provided'
            });
        }
        // extract token
        const token  = authHeader.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // attatch user info to request

        req.user = decoded;
        next();  // move to controller 
    }catch(error) {
        return res.status(401).json({message:"Invalid or expired token"})
    }
}