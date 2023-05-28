const express = require("express");
const bodyparser = require("body-parser");
// const request= require("request");
const https= require("https");

const client = require("@mailchimp/mailchimp_marketing");





const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/",(req,res)=>{
    res.sendFile(__dirname +"/failure.html");

    const name=req.body.name;
    const email=req.body.email;
    // console.log(name,email);

   
    // res.sendFile(__dirname + '/Sucess.html');
    var data={
        members: [
            {
                EMAIL: email,
                status:"subscribed",
                merge_fields:{
                    NAME: name
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);  
    const url="https://us21.api.mailchimp.com/3.0/lists/f5eb0c66e9"
    
    const options={
        method:"POST",
        auth: "tanmay631: c797113602a11597e538f519e6f1be91-us21"

    }

  const request=  https.request(url,options, (response)=>{
        response.on("data",(data)=>{
            console.log(JSON.parse(data) + " \n" + response.statusCode);
            var status=Number(response.statusCode);
            if(status>=400 && status <500){
                res.sendFile(__dirname +"/failure.html");
            }
        })
    });

    request.write(jsonData);
    request.end();
});
    




// c797113602a11597e538f519e6f1be91-us21
//LIST ID--
// f5eb0c66e9


app.listen(3000,()=>{
    console.log("server running at port 3000");
})
