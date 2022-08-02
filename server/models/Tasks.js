//const Connection =require('../dbconfig/dbconnect');
const { DataTypes,Sequelize }=require('sequelize');

//const dbConnection=Connection.connect;

module.exports=(dbConnection)=>{
    const task= dbConnection.define('task',{
    task:{
        type:DataTypes.STRING,
        allowNull:false
    },
    /* uid:{
        type:DataTypes.STRING,
        allowNull:false
    }, */
    created:{
        type:DataTypes.DATE,
        allowNull:false
    },
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    score:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);
task.associate=(model)=>{
    task.belongsTo(model)
}
return task;
}
//module.exports.TasksTable=Tasks;