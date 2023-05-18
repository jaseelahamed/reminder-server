// importing jwt package
const jwt = require("jsonwebtoken");

const db = require("./db");

const register = (usid, usname, pswd) => {
  return db.RRR.findOne({
    userid: usid,
  }).then((acc) => {
    console.log(acc);
    if (acc) {
      return {
        status: false,
        message: "Account Already exists!!......please login",
        statusCode: 404,
      };
    } else {
      let accr = new db.RRR({
        userid: usid,
        username: usname,
        password: pswd,
        reminder: [],
      });
      accr.save();
      return {
        status: true,
        message: "Registration completed!!",
        statusCode: 201,
      };
    }
  });
};
// const login = (usid,pswd) => {
//   return db.RRR.findOne({
//    userid:usid,
//    password:pswd
//   }).then(res=>{
//     console.log(res)
//     if(res){
//       currentUser = res.username
//       currentusid = usid
//             token=jwt.sign(
//               {currentusid:usid},"secretsuperkey"
//             );
//             return {
//                       status: true,
//                       message: "Login successfull",
//                       statusCode: 200,
//                       currentUser,
//                       currentusid,
//                       token
//                     };
//                   }
//                   else {
//                           return {
//                             status: false,
//                             message: "Invalid password or Account Number",
//                             statusCode: 400
//                           }
//                         }})

// };

const login = (usid, pswd) => {
  return db.RRR.findOne({
    userid: usid,
    password: pswd,
  }).then((res) => {
    console.log(res + "from login in ds");
    if (res) {
      currentUser = res.username;
      currentusid = usid;
      token = jwt.sign(
        //acno of current user
        { currentusid: usid },
        "secretsuperkey1234"
      );

      return {
        status: true,
        message: "Login successfull",
        statusCode: 200,
        currentUser,
        currentusid,
        token,
      };
    } else {
      return {
        status: false,
        message: "invalid password or account number",
        statusCode: 400,
      };
    }
  });
};

const addReminder = (message, date, time, req) => {
  return db.RRR.findOne({
    userid: req.usid,
  })
    .then((res) => {
      if (res) {
        if (res.userid != req.usid) {
          return {
            status: false,
            message: "Given userid is not Authenticated",
            statusCode: 422,
          };
        } else {
          let reminderobject = {
            message,
            date,
            time,
          };
          // console.log(reminderobject+"from addreminder")
          res.reminder.push(reminderobject);
          res.save();
          return {
            status: true,
            message: "Reminder added successfully",
            statusCode: 200,
          };
        }
      } else {
        return {
          status: false,
          message: "Reminder cannot be added",
          statusCode: 400,
        };
      }
    })
    .catch((err) => console.log(err));
};
const getReminders= (currentusid)=>{
  console.log(currentusid)
  return db.RRR.findOne({
    userid:currentusid
  }).then(res=>{
    console.log(res)
    if(res){
      return{
        status:true,
        message:"success",
        data:res.reminder,
        statusCode:200
      }
    }
    else{
      return{
        status:false,
        message:"failed",
        data:res.reminder,
        statusCode:422
      }
    }
  })
}
const deleteAccount=(acno)=>{
  return db.Account.deleteOne({
    account_no:acno
  }).then(res=>{
    if(res){
      return{
        status:true,
        message:"Deletion success",
        statusCode:200
      }
    }
    else{
      return{
        status:false,
        message:"Deletion Failed",
        statusCode:400
      }
    }
  })
}

module.exports = {
  register,
  login,
  addReminder,
  getReminders,
  deleteAccount
};
