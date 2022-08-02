//const Connection=require('../dbconfig/dbconnect');
const {DataTypes,Sequelize}=require('sequelize');
//const userinfo=require('./userinfo');

//const dbConnection=Connection.connect;
module.exports=(dbConnection)=>{
    const session= dbConnection.define('session',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    /* uid:{
        type:DataTypes.STRING,
        allowNull:false
    }, */
    loggedin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    initial:{
        type:DataTypes.DATE,
        allowNull:false
    },
    latest:{
        type:DataTypes.DATE,
        allowNull:false

    }
},
{
    freezeTableName: true,
    timestamps: false
});
session.associate=(model)=>{
    session.belongsTo(model)
}
return session;
}
//SessionTable.belongsTo(userinfo.UserTable)
//module.exports.STable=SessionTable;

/* module.exports.SessionTable=async function(uid){
    await userInfo.create({uid}).then((data)=>{
        console.log(data.toJSON(),"added");
    });
} */
//dbConnection.sync();