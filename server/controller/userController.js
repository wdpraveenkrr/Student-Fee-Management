
import studentModel from "../model/studentModel.js";

export const getUserData = async (req, res)=>{

    try {
        
        
        const user = await studentModel.findById(req.userId)

        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        res.json({success:true, 
            
            userData :{
            name : user.name,
            email :user.email,
            isAccountVerified:user.isAccountVerified,
            studentid: user._id
        }
     })

        
    } catch (error) {
        res.json({success:false, message:error.message})
    }

}

