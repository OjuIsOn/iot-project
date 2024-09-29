const { getUser } = require("../services/auth");

async function restrictToLoggedinUser(req, res, next) {
    try {
        const userUid = req.cookies.token;

        if (!userUid) {
            return res.redirect("/api/user/login");
        }
        const user = await getUser(userUid); 

        if (!user) {
            return res.redirect("/api/user/login");
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Error in restrictToLoggedinUser middleware:', error);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    restrictToLoggedinUser,
};
