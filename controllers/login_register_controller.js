const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const db = require("../models");
const login_regis = db.loginregis;

exports.register = async function (req,res,next) {
    const {fullname,email,password} = req.body

    const UserEmail = await login_regis.findOne({where :{email:email}});
    if(UserEmail){
        return res.status(400).json({message:'มีผู้ใช้งานอีเมล์นี้ในระบบแล้ว'})
    }

    const hash = await argon2.hash(password);

    const newUser = await login_regis.create({
        fullname:fullname,
        email:email,
        password:hash
    });

    return res.status(200).json({
        message:'สมัครสมาชิกเรียบร้อยแล้ว',
        user:newUser
    })
}

exports.login = async function(req,res,next){
    const {email,password} = req.body;
  //1. นำ email ไปตรวจสอบว่ามีอยู่ในระบบหรือไม่
    const user = await login_regis.findOne({email:email});

    if(!user){
        return res.status(400).json({
            message:'ไม่พบอีเมล์นี้ในระบบ'
        })
    }
//2. ถ้าอีเมล์มีอยู่จริง ให้นำรหัสผ่านจากตาราง ไปเปรียบเทียบกับ password ที่ส่งมา
    const isValid = await argon2.verify(user.password,password);
    if(!isValid){
        return res.status(401).json({
            message:'รหัสผ่านไม่ถูกต้อง'
        });
    }
 //3. สร้าง token และส่งให้ client (webapp, mobile app) ไว้ยืนยันตัวตนกับระบบเรา
    const token = jwt.sign(
        {user_id: user.id,email: user.email},
        process.env.JWT_KEY,
        {
            expiresIn: "2d"
        }
    );

    return res.status(200).json({
        message: 'เข้าสู่ระบบสำเร็จ',
        access_token: token,
    })
}

exports.getprofile = async function (req,res,next){
const data = await login_regis.find();
res.status(200).json({
    message:'Access Data',
    data: data
})
}