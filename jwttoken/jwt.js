const jwt= require('jsonwebtoken')

const tokengenerated = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '5m'})
}