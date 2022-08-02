module.exports.Authenticate=(request,reply)=>{
   if(request.auth.isAuthenticated)
   reply(true).code(200);
   else
   reply('not valid').code(401);
}