const {User} = require('../models') // memanggil tabel 
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const { where } = require('sequelize')
const {JWT_SECRET_KEY} = process.env

module.exports={
    register : async (req, res, next) => {
        try {
            const {firstname, lastname, email, password} = req.body;

            const checkEmail = await User.findOne({where: {email}});

            if(checkEmail){
                return res.status(400).json({
                    status: false,
                    message: 'email sudah terdaftar',
                    data: null
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                firstname, lastname, email, password: hashPassword
            });

            return res.status(201).json({
                status: true,
                message: 'user created',
                data: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }
            });

        }catch (e) {
            next(e);
        }
    },
    login : async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({where: {email}});

            if(!user){
                return res.status(400).json({
                    status: true,
                    message: 'email dan password salah',
                    data: null
                });
            }

            const passwordCorrect = await bcrypt.compare(password, user.password);
            if (!passwordCorrect) {
                return res.status(404).json({
                    status: false,
                    message: 'email or password is not correct!',
                    data: null
                });
            }

            const payload = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            };

            const token = await jwt.sign(payload, JWT_SECRET_KEY);
            return res.status(200).json({
                status: true,
                message: 'success!',
                data: {
                    token: token
                }
            });

        }catch (e) {
            next(e);
        }

    },
    whoami : async (req, res, next) =>{
        try {
            return res.status(200).json({
                status: true,
                message: 'success',
                data: {
                    user: req.user
                }
            });

        }catch (e){
            next (e);
        }

    }
}