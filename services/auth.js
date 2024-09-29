const jwt=require("jsonwebtoken")
const SecretKey="StupidFuck"
function setUser(user) {
    if(!user) return res.send("no user");
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        password:user.password,
        cycleNum:user.cycleNum
    },SecretKey)
    
} 

async function getUser(token) {
    if(!token) return null
    try {
        return jwt.verify(token,SecretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    getUser,
    setUser,
}