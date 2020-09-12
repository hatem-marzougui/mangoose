 const express=require ('express');
 const connectDB=require('./config/connectDB');
 const app=express();
 const router=require('./routers/person');

 // middelware bech ennajem na9ra donne elli fil body
 app.use(express.json())
 connectDB();
 app.use("/persons",router);

 const port=process.env.PORT || 3000;

 app.listen(port,err=> err ? 
 console.log('error'):console.log('server started'));