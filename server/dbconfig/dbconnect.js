const Sequelize=require('sequelize');
const sequelize=new Sequelize('info','sriramr','',{
    host:'localhost',
    port:5432,
    dialect:'postgres'
});

async function dbconnection(){
    try {
        await sequelize.authenticate();
        console.log("connected to database");
    } catch (error) {
        console.log("failed to connect to db");
        console.log(error);
    }
}
dbconnection();
module.exports.connect=sequelize;