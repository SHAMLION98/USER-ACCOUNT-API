const userModel = require("../model/userModel")
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const {username, gmail, password} = req.body
    if (!username || !gmail || !password) {
        return res.json({MSG: "Enter all input"}).status(404)
    }
    try {
        const user = await userModel.findOne({gmail})
    if (user) {
        return res.json({MSG: 'User already exist'}).status(409)
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    
    const newUser = new userModel({...req.body, password: hashedPassword})
        await newUser.save()
        res.json({user: newUser})
    } catch (error) {
        console.log(error)
    }
}

const userLogin = async (req,res) => {
    const { gmail, password } = req.body
    try{
        const user = await userModel.findOne({gmail})
        if (!user) {
            return res.json({MSG: "Gmail or Password Incorrect!"})
        }
        const comparePass = await bcrypt.compare(password, user.password)
        if (!comparePass) {
            res.json({MSG: 'Gmail or Password Incorrect!'}).status(404)
        }
        const token = tokengenerated(user._id)
        const {password: _, ...userData} = user.toObject()

        res
        .cookie('token', token, {httpOnly: true, sameSite: 'strict'})
        .status(200)
        .json({user: userData})
    } catch (error) {
        console.log(error)
    }
}

const allUsers = async (req, res) => {
    const users= await userModel.find()
    if (!users) {
        res.json({MSG: 'No User Found'})
    }
    res.json({users: users}).status(200)
}

module.exports = {register, userLogin, allUsers}