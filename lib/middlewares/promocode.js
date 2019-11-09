const Promocode = require('../models/promocodes')
module.exports = {
    CreatePromocode: (req, res) => {
        Promocode.findOne({ code: req.body.code })
            .then(u => {
                if (u === null) {
                    const NewCode = new Promocode({
                        code: req.body.code,
                        createdfor: req.body.createdfor,
                        status: "active",
                        discount: req.body.discount,
                        type:req.body.type,
                        product:req.body.product
                    })
                    NewCode.save()
                        .then(u => {
                            res.send({
                                message: "Saved"
                            })
                        })
                } else {
                    res.send({
                        message: "Already Exists"
                    })
                }
            })

    },
    UpdatePromocode: (req, res) => {
        Promocode.findOneAndUpdate({ _id: req.body.id }, {
            code: req.body.code,
            createdfor: req.body.createdfor,
            discount: req.body.discount,
            type:req.body.type,
            product:req.body.product
        })
            .then(u => {
                res.send({
                    message: "Updated"
                })
            })
    },
    DeletePromocode: (req, res) => {
        Promocode.deleteOne({ _id: req.body.id })
            .then(u => {
                res.send({
                    message: "Deleted"
                })
            })
    },
    LoadCodes: (req, res) => {
        Promocode.find()
            .then(u => {
                res.send(u)
            })
    },
    ChangeStatus: (req, res) => {
        console.log(req.body)
        Promocode.findOne({ _id: req.body.id })
            .then(u => {
                console.log(u)
                if (u.status === "active") {
                    Promocode.updateOne({ _id: req.body.id }, {
                        status: "inactive"
                    })
                        .then(u => {
                            res.send("StatusChanged")
                        })
                } else {
                    Promocode.updateOne({ _id: req.body.id }, {
                        status: "active"
                    })
                        .then(u => {
                            res.send("StatusChanged")
                        })
                }
            })
    }
}