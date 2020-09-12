const mongoose=require ('mongoose');
config=require('config')

const connectDB=()=>{
    mongoose.connect(config.get('MONGOURI'), {useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>console.log("mongoose connected"))
    .catch(err=>console.log('errer'))
}


module.exports=connectDB