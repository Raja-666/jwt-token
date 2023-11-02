const UserModel = require('../models/users')
const bcrypt = require('bcrypt')


const createData = async (req, res) => {
   
    const exiting = await UserModel.findOne({ name: req.body.name })
    if (exiting) {
        return res.status(409).json({ message: "Already User Exiting" })
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const createUSer = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword

    }


    UserModel.create(createUSer)
        .then(() => res.status(201).json({ message: "Register SuccessFully " }))
        .catch(() => res.status(409).json({ message: "Some Went Wrong" }))
}

const getAllData = (req, res) => {
    UserModel.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(404).json({ message: "Cannot Get Datas" }))

}

const editUserRoute = async (req, res) => {
    console.log(req.body);
    try {
        const getUser = await UserModel.findOne({ _id: req.body.id })
        res.status(200).json(getUser)
    } catch (err) {
        res.status(404).json({ message: "data not get" })
    }

}

const updateUser = async (req, res) => {
    try {
        const updateUser = await UserModel.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, email: req.body.email } })
        res.status(200).json({ message: "success", updateUser })
    } catch (err) {
        res.status(404).json({ message: "Data Not Found" })
    }
}
const deleteUser = async (req, res) => {
    console.log(req.body);
    await UserModel.deleteOne({ _id: req.body.id })
    res.status(200).json({ message: "successFully Deleted" })
}

module.exports = { createData,getAllData,editUserRoute,updateUser,deleteUser}