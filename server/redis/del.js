const redis=require('redis');

module.exports.Del=async(key)=>{
    const client=redis.createClient();
    await client.connect();
    client.del(key);
}