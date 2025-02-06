const { Router } = require("express")
const {register, userLogin, allUsers, update_A_User, delete_A_User} = require("../controller/userController")
const authMiddleware = require("../Middleware/tokenMiddleware")

const register = require()

const router = Router()


router
    .post('api/user/register', register)

    .post('/user/login', userLogin)
    .get('/users', authMiddleware, allUsers)
    .delete('/user/delete/:id', authMiddleware, delete_A_User)
    .put('/user/update/:id', authMiddleware, update_A_User)

module.exports = router