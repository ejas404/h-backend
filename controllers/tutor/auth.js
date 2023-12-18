import asyncHandler from "express-async-handler"
import { generateToken } from "../../utility/token.js"
import tutorCollection from "../../models/tutor.js";




export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await tutorCollection.findOne({email});
    if (user && (await user.checkPassword(password))) {
       let token = generateToken(res, user._id);
        let userDetails = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        res.status(201).json({
           user : userDetails,
           token : token
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }

})


export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await tutorCollection.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await tutorCollection.create({name, email, password});
    if (user) {
          generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role : user.role
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data.");
    }
})