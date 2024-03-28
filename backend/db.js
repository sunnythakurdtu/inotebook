const mongoose=require("mongoose");
const mongoURI="mongodb://127.0.0.1:27017/inotebook";
const connecttoMongo=()=>{
    mongoose.connect(mongoURI,{}).then(result=>{
console.log("result")
    }).catch(err=>{
        console.log("err")
    })
}
module.exports=connecttoMongo