import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

//signup
export const signup = async (req, res)=>{
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required!!",
            })
        }
        const emailRegex = /^[a-zA-Z0-9._]+@gmail.com$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email!!",
            })
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({
                success: false,
                message: "Pasword must be at least 8 characters and include an uppercase letter, lowecase letter, number, and special character."
            })
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: "false",
                message: "User already exists!!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({
            success: true,
            message: "User registered successfullly!!",
        });
    }
    catch(err){
        console.log("signup error:", err)
        console.log(err.stack);
        res.status(500).json({
            success: "false",
            message: "server error!!",
        });
    }
};

//login
export const login = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found!",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid password!",
            });
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );

        res.status(200).json({
            success: true,
            message: "Login Successful!!",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch(err){
        console.log(err);

        res.status(500).json({
            success: false,
            message: "server error!!",
        });
    }
};

//forgot password
export const forgotPassword = async(req,res) =>{
    try{
        const{email } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!!",
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        //token expires in 15 mins
        user.resetPasswordExpires = Date.now() + 15*60*1000;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Reset token generated successfully!!",
            resetLink: `http://localhost:3000/reset-password/${resetToken}`,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "server error!!",
        });
    }
};

export const resetPassword = async(req,res)=>{
    try{
        const {token} = req.params;
        const{password} = req.body;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({
                success: false,
                message: "Pasword must be at least 8 characters and include an uppercase letter, lowecase letter, number, and special character."
            })
        }
        
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now()},
        });

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired Token!!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Passoword reset successfully!!",
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "server error!!",
        });
    }
};
