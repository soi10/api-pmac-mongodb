const passsport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('../models')
const loglogin = db.loglogin;
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = process.env.JWT_KEY;

passsport.use(new JwtStrategy(opts,async function(jwt_payload,done){
    try{
        const user = await loglogin.findOne({where :{Username:jwt_payload.user_id}});
        if(user){
            return done(null,user);
        }
    } catch(error) {
        done(error)
    }
}));

module.exports.isLogin = passsport.authenticate('jwt',{session:false});