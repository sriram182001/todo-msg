 const Connection =require('../dbconfig/dbconnect');
//const Test = require('./test');
const Msg=require('./msg');
const Task=require('./Tasks');
const Session=require('./session');
const UserInfo=require('./userinfo');


const dbConnection=Connection.connect;

const models = {}

//models.Test = Test(dbConnection)
models.msg=Msg(dbConnection);
models.task=Task(dbConnection);
models.session=Session(dbConnection);
models.user=UserInfo(dbConnection);

models.user.associate(models.msg);
models.user.associate(models.session);
models.user.associate(models.task);
models.msg.associate(models.user);
models.session.associate(models.user);
models.task.associate(models.user);

//dbConnection.sync({force:true}).then(()=>{console.log('synced')}).catch((err)=>{console.log(err)});;
module.exports = models

