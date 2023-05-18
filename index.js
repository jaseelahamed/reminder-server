

// importing express fw
const express = require("express");

const jwt = require("jsonwebtoken");


// importing cors
const cors=require("cors")


const dataservice = require("./service/data.service");

// creating server app
const app = express();
app.use(cors({
  origin:"http://localhost:4200"
 }))


//  app.use(cors({
//   origin:"http://localhost:4200"
//  }))


// to parse json to js
app.use(express.json());
// const appMiddleware = (req, res, next) => {
//   try {
//     console.log("middle")
//     token = req.headers["x-access-token"];
//     console.log(token)
//     result = jwt.verify(token,"secretsuperkey");
//     req.userid=result.currentusid
//     console.log(result);
//     next();
//   } catch {
//     res.status(400).json({
//       status: false,
//       message: "invalid user....please login",
//       statusCode: 400,
//     });
//   }
// }


const appMiddleware = (req, res, next) => {
  try {
    console.log("middle")
    token = req.headers["x-access-token"];
    console.log(token)
    result = jwt.verify(token, "secretsuperkey1234");
    req.usid=result.currentusid
    // req.currentAcno=result.currentAcno
    console.log(result);

    next();
  } catch {
    res.status(400).json({
      status: false,
      message: "invalid user....please login",
      statusCode: 400,
    });
  }
};
  
  












app.post("/register", (req, res) => {
    const result = dataservice.register(
 
      req.body.usid,
      req.body.usname,
      req.body.pswd
      
    );
    // console.log(usid)
    
    result.then((resobj) => {
      res.status(resobj.statusCode).send(resobj);
    });
  });

// LOGIN API
app.post("/login", (req, res) => {
  const result = dataservice.login(req.body.usid, req.body.pswd);
  // res.status(result.statusCode).json(result)
  result.then((resobj) => {
    res.status(resobj.statusCode).send(resobj);
  });
});
// reminder
app.post("/addReminder",appMiddleware, (req, res) => {
  const result = dataservice.addReminder(
    req.body.message,
    req.body.date,
    req.body.time,
    req
  );
  console.log("req.body.date")
  // res.status(result.statusCode).json(result)

  result.then((resobj) => {
    res.status(resobj.statusCode).send(resobj);
  });
});

app.post("/viewbook",appMiddleware, (req, res) => {
  const result = dataservice.getReminders(req.body.userid);
  // res.status(result.statusCode).json(result);
  result.then(resobj=>{
    res.status(resobj.statusCode).send(resobj)
  })
});


app.delete("/delacc:acno",appMiddleware, (req, res) => {
  const result=dataservice.deleteAccount(req.params.acno)
  result.then(resobj=>{
    res.status(resobj.statusCode).send(resobj)
  })
  // res.send("DELETE request hit");
});




  1// configuring port number for server app
app.listen(3000, () => {
  console.log("server running on port 3000");
});
