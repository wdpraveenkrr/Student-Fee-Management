import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({    
    cname:{type:String,required:true,unique:true } ,
    cfee:{type:Number,required:true},
    cduration:{type:Number,required:true},
    ctopics:{type:String,required:true},
    cdescription:{type:String,required:true},
})

const courseModel = mongoose.models.course || mongoose.model("course",courseSchema);
export default courseModel;
