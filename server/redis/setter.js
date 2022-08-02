const redis=require('redis');

module.exports.Set=async(key,ttl,data)=>{
    const client=redis.createClient();
    await client.connect();
    client.setEx(key,ttl,data);
}