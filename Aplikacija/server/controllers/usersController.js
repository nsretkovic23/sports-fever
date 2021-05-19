import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

export const signin = async (req,res) =>{
    const {email, password} = req.body; //za svaki post request mi dobijamo podatke kroz req.body

    try {
        const existingUser = await User.findOne({email}); //trazimo po email-u da li korisnicki nalog vec postoji

        if(!existingUser)
            return res.status(404).json({message: "User does not exist."});

        const isPasswordTrue = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordTrue)
            return res.status(400).json({message:"Invalid password"});

        const token = jwt.sign({email:existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"}) //ovde promeniti test i staviti taj 'test' secret string u env prom

        res.status(200).json({result:existingUser, token})
    } catch (error) {
        res.status(500).json({message:"Something went wrong."});
    }
}

export const signup = async (req,res) =>{
    const { email, password, confirmPassword, firstName, lastName }=req.body;
    const createdEvs = [];
    try {
        const existingUser = await User.findOne({email}); //trazimo po email-u da li korisnicki nalog vec postoji

        if(existingUser)
            return res.status(404).json({message: "User already exists."});
        
        if(password!==confirmPassword)
            return res.status(400).json({message: "Passwords don't match."})

        const hashedPasswrod = await bcrypt.hash(password, 12); //drugi arg je nivo "tezine" za hesiranje passworda

        const result = await User.create({email, password:hashedPasswrod, name: `${firstName} ${lastName}`, credits:1000, createdEvs});

        const token = jwt.sign({email:result.email, id: result._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result, token});
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong."})
    }

}

export const getUserById = async (req,res)=>{
    const {id} = req.params;
    try{
        console.log(id);
        const userInfo = await User.findById(id);
        res.status(200).json(userInfo);
    } catch(error){
        res.status(404).json({message:"nije pronadjen po id-u"});
    }
}