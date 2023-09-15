const express = require("express")
const { users } = require("./model/index")
const bcrypt = require("bcrypt")
const app = express()

app.set("view engine","ejs")

//ejs file dekhauna lai get use garinxa
app.get("/register",(req,res)=>{
    res.render("register.ejs")
})

//incoming form ko data lai parse garxa
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//database connection
require("./model/index")

//post api for handling user registration
app.post("/register",async(req,res)=>{
    console.log(req.body)
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    await users.create({
        email : email,
        username : username,
        password: bcrypt.hashSync(password,8)
    })
    res.send("User registration sucessFull")
})


//server side validation
    // if(!email || !username || !password){
    //     return res.send("please fill the requirements")
    // }



app.listen(3000,function(){
    console.log("NodeJs project has started at port 3000")
})