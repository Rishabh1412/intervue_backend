const User = require("../models/User");

exports.getUser= async(req,res)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
        }
        const user=await User.findById(userId).select('-password -__v');// Exclude password and version field
        if(!user){
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(user);
    }catch(err){
        console.error('Get User Error:', err);
        res.status(500).json({ error: 'Failed to retrieve user information.' });
    }
}