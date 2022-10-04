const jwt = require('jsonwebtoken');
const config = process.env.JWT_KEY;

const verifyToken = (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    
    if(!token){
        return res.status(403).json({message :"A Token is required for authentication"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_KEY);
    } catch (err){
        return res.status(401).json({message :"Invalid Token"})
    }
    return next()
}

module.exports = verifyToken;
