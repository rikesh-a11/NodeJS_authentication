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
    res.redirect("/login")
})


//server side validation
    // if(!email || !username || !password){
    //     return res.send("please fill the requirements")
    // }



    //for LOGIN form
    app.get("/login",(req,res)=>{
        res.render("login.ejs")
    })

    app.post("/login",async(req,res)=>{
        const email = req.body.email 
        const password = req.body.password 
        
         // 1st - tyo email users table ma xa ki nai check
      const userExist =  await users.findAll({
            where : {
                email : email
            }
        })
        if(userExist.length>0){
            //2nd - password pani check garnu paryo
           const isMatch = bcrypt.compareSync(password,userExist[0].password)
           if(isMatch){
            res.send("Logged in successfully")
           }else{
            res.send("Invalid Email or password")
           }


        }else{
            res.send("Invalid Email or password")
        }


    })






app.listen(3000,function(){
    console.log("NodeJs project has started at port 3000")
})