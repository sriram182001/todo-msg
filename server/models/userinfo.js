//const Connection =require('../dbconfig/dbconnect');
const { DataTypes }=require('sequelize');
//const session=require('./session');
//const tasks=require('./Tasks');
//const msg=require('./msg');

//const dbConnection=Connection.connect;

module.exports=(dbConnection)=>{
    const userinfo= dbConnection.define('userinfo',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    passcode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mailid:{
        type:DataTypes.STRING,
    },
    uid:{
        type:DataTypes.STRING,
        primaryKey:true
    },
},
    {
        freezeTableName: true,
        timestamps: false
    }
);
userinfo.associate=(model)=>{
    userinfo.hasMany(model,{onDelete:'cascade'})
}
return userinfo;
}
/* userInfo.hasMany(session.STable,{onDelete:'cascade'});
session.STable.belongsTo(userInfo);

userInfo.hasMany(tasks.TasksTable,{onDelete:'cascade'});
tasks.TasksTable.belongsTo(userInfo);

userInfo.hasMany(msg.MsgTable,{onDelete:'cascade'})
msg.MsgTable.belongsTo(userInfo);

dbConnection.sync({}).then(()=>{console.log('synced')}).catch((err)=>{console.log(err)});;
module.exports.UserTable=userInfo; */