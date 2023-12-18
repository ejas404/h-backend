
import asyncHandler from "express-async-handler"
import studentCollection from "../../models/student.js";


export const getUsers = asyncHandler(async (req, res) => {
    console.log('get users requsted')
    const users = await studentCollection.find({});
    res.status(200).json(users);
})



export const editUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await studentCollection.findOne({email});
    
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });

    } else {
        res.status(404);
        throw new Error("User not found.");
    }
})


export const deleteUser = asyncHandler(async (req, res) => {
    console.log('delete user')
    const { id } = req.params;

    const user = await studentCollection.findByIdAndDelete(id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});


export const blockUser = asyncHandler(async (req, res) => {
    console.log('block user called')
    const { id } = req.params;

    const user = await studentCollection.findById(id);
    if (user) {

        user.isBlocked = true
        user.save()


        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});


export const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await studentCollection.findById(id);
    if (user) {

        user.isBlocked = false
        user.save()


        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});

