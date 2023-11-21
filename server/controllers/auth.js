import  Jwt  from "jsonwebtoken"
import bcrypt from "bcryptjs"
import users from "../models/auth.js"

export const signup= async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existingUser= await users.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: "User already Exist." });
          }
          
        const hashedPassword=await bcrypt.hash(password,12)
        const newUser=await users.create({name,email,password: hashedPassword})
        const token=Jwt.sign({email:newUser.email,id:newUser._id},"test");
        res.status(200).json({result:newUser,token})

    }catch(error){
        res.status(500).json("Something went wrong")
    }

}
export const login= async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existingUser= await users.findOne({email});
        if(!existingUser){
            return res.status(404).json({message: "User does not Exist."})
            
        }
        const isPsswordCrt=await bcrypt.compare(password,existingUser.password)
        if(!isPsswordCrt){
            return res.status(404).json({message:"Invalid Crendentials"})
        }
        const token=Jwt.sign({email:existingUser.email,id:existingUser._id},"test");
        res.status(200).json({result:existingUser,token})

    }
    catch(error){
        
        res.status(500).json({ message: "Something went wrong" });

    }
    
}