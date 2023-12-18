import asyncHandler from "express-async-handler"
import { generateToken } from "../../utility/token.js"
import studentCollection from "../../models/student.js";



export const login = asyncHandler(async (req, res) => {
    console.log('login requested')
    const {email, password} = req.body;

    const user = await studentCollection.findOne({email});
    if(!user){
        res.status(401);
        throw new Error("Invalid email or password.");
    }
    if (user && !(await user.checkPassword(password))) {
        res.status(401);
        throw new Error("Invalid email or password.");
    }

    

    let token = generateToken(res, user._id);
    let userDetails = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role : user.role,
        isBlocked : user.isBlocked
    }
    console.log('b4 response')
    res.status(201).json({
       user : userDetails,
       token : token
    })

})


export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await studentCollection.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await studentCollection.create({name, email, password});
    if (user) {
          generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,  
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data.");
    }
})