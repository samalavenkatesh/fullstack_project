const mongoose = require('mongoose');
// mongodb+srv://anilstark:<db_password>@cluster0.ccybf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect("mongodb+srv://anilstark:stark2050@cluster0.ccybf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('mongodb connected...');
})
.catch((err)=>{
    console.log("mongodb connection error",err);
})