const EmployeeUser = require('../../../models/Employee/users')
const jwt = require('jsonwebtoken')
module.exports = {
    LoginHandler: (req, res) => {
        EmployeeUser.find({ email: req.body.email })
            .then(u => {
                if (u) {
                    if (u[0].role === req.body.role) {
                        if (u[0].password == req.body.pass) {
                            res.send({
                                message: "User Found!",
                                data: u[0]
                            })
                        } else {
                            res.send({
                                message: "Wrong Password",
                            })
                        }
                    } else {
                        res.send({
                            message: "No User Exists In This Role!"
                        })
                    }
                }
            })
    }
}