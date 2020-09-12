

const express=require('express');
const router=express.Router();
const Person=require('../models/Person');

// 1-create person 
router.post("/createOne",(req,res)=>{
    const {name,age,favoriteFoods }=req.body;
    const newPerson=new Person({name,age,favoriteFoods});
    newPerson.save()
    .then(persons=>res.send(persons))
    .catch(err=>console.log(err))
}
)

//2-create many persons
router.post("/createMany",(req,res)=>{
    Person.create(req.body)
    .then(persons=>res.send(persons))
    
}
)

//3- find all persons 

router.get("/allpersons",(req,res)=>{
   Person.find({})
   .then(persons=>res.send(persons))
    
}
)



 //4-Find all the people having a given name

 router.get("/findperson",(req,res)=>{
    const {name}=req.body;
    Person.find({name})
    .then(persons=>res.send(persons))
     
 }
 )

 //5-Find the only person having a given _id
 router.get("/findpersonbyID",(req,res)=>{
    const {_id}=req.body;
    Person.findById({_id})
    .then(persons=>res.send(persons))
     
 })

 //6-Find person by id , update favoriteFoods then save 
 router.put("/updateperson",(req,res)=>{
    const {_id,favoriteFoods}=req.body;

    Person.findById({_id},(err,data)=>{

        if(err){console.log(err)}
        else {data.favoriteFoods.push(favoriteFoods)};

        data.save((err,data)=>{
          if(err){console.log(err)}
          else {console.log(data),res.send(data)}
        }) 
     
 })
});


//7-find a person by name,update his age
router.put("/findOneAndUpdate",(req,res)=>{
const {name,age}=req.body
Person.findOneAndUpdate({name},{age},{new: true} ,(err,data)=>{
    if(err){console.log(err)}
    else{console.log(data);res.send(data)}                   
    })

})


//8-find a person by id and remove
router.delete("/removeByid",(req,res)=>{
    const {_id}=req.body
    Person.findByIdAndRemove({_id} ,(err,data)=>{
        if(err){console.log(err)}
        else{console.log(data);res.send(data)}                   
        })
    
    })


 //9-delete many persons with specified name with model.remove()   
 router.delete("/removemany",(req,res)=>{
    const {name}=req.body;
    Person.remove({name} ,(err,data)=>{
        if(err){console.log(err)}
        else{console.log(data);res.send(data)}                   
        })
    
    })

//10-find peoples who like burrito,sort them by name,limit the result to 2 documents and hide age field
router.get("/query",(req,res)=>{
    const {favoriteFoods}=req.body;
    Person.find( { favoriteFoods: { $all: [ favoriteFoods] } })
        .sort({name:'asc'})
        .limit(2)
        .select('-age')
         .exec((err,data)=>{
    if(err){console.log(err)}
    else{console.log(data);res.send(data)}
  })
    
    })



module.exports=router