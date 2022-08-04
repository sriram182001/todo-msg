const Hapi=require('hapi');
const server=new Hapi.Server();
const cj=require('./cronjob/croncheck')
const Routes=require('./routes/app.js')
//const Connection=require('./dbconfig/dbconnect');
const valid=require('./Validation/validation')
const bullArena=require('./bullarena/bullarena')


//connection
server.connection({
    port:3000,
    host:'localhost',
    routes:{cors:true}
});

//registering plugins
server.register([require('vision'),require('hapi-auth-cookie')]);
server.views({
        engines:{'html':require('handlebars')} ,
        relativeTo: __dirname,
        path: 'views'
    });

//setting session
server.auth.strategy('session', 'cookie', true, {
    password: 'password-should-be-32-characters',
    cookie: 'session',
    ttl:1000*60*60*24,
    isSecure: false,
    clearInvalid:true,
    keepAlive:true,
    validateFunc: valid.isvalid
} 
);

//routes
server.route([...Routes]);

//starting the server
server.start((err)=>{
    if(err){
        console.log(err)
    }
    console.log(`server running @ ${server.info.uri}`)
})