//create schema and export the model
const mongoose=require('mongoose')
const schema=mongoose.Schema;

const personSchema=new schema({
    name:{ type:String, required:true},
    age:{type:Number},
    favoriteFoods:[{type:String}]
})

module.exports=Person=mongoose.model("persons",personSchema)