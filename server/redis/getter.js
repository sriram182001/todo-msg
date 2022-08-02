const redis=require('redis');

module.exports.Getter=async(key)=>{
const client=redis.createClient();
await client.connect();
const val=await client.get(key);
return val;
}
