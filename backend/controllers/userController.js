const User= require('../models/userModel');

const getUsers= async(req, res) => {
    const users= await User.find();
    res.json(users)
}

const createUser = async (req, res) => {
    const {name, email, age} = req.body;
    const newUser = new User({name, email, age});
    await newUser.save();
    res.status(201).json(newUser)
    
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
    res.json(updatedUser)
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted'})
}

module.exports ={
    getUsers,
    createUser,
    updateUser,
    deleteUser  
}