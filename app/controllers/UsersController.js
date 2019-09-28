const { User } = require('../models/User')
const pick = require('lodash')
// localhost:3000/users/register
module.exports.register = function (req, res) {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(function (user) {
            res.send(user, ['_id', 'username', 'email'])
            // res.send(user)
        })
        .catch(function (err) {
            res.send(err)
        })
}

// localhost:3000/users/login 
module.exports.login = function (req, res) {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(function (user) {
            return user.generateToken()
        })
        .then(function (token) {
            res.setHeader('x-auth', token).send({})
        })
        .catch(function (err) {
            res.send(err)
        })
}

// localhost:3000/users/account 
module.exports.account = function (req, res) {
    const { user } = req
    res.send(user)
}


// localhost:3000/users/logout
module.exports.logout = function (req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(function () {
            res.send({ notice: 'successfully logged out' })
        })
        .catch(function (err) {
            res.send(err)
        })
}

