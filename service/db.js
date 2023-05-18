const mongoose=require("mongoose")

// connection string
mongoose.connect("mongodb://localhost:27017/Reminder",{
useNewUrlparser:true
})
// definig model
const RRR=mongoose.model('RRR',{
    userid:Number,
    username:String,

    
    password:String,
    reminder:[],
})
module.exports={
    RRR
}