const {verifyToken} = require("../modules/jwt");

module.exports = async (req, res, next) => {
   const {users, sessions} = req.db;

   const token = req.cookies["token"] || req.headers["Authorization"];

   if (token) {
      let {session_id} = verifyToken(token);
      let session = await sessions.findOne({
         where: {
            session_id,
         },
         raw: true,
      });

      if (!session) {
         try {
            res.clearCookie("token").redirect("/");
         } catch (e) {
            res.redirect("/");
         } finally {
            return;
         }
      }

      const user = await users.findOne({
         where: {
            user_id: session.user_id,
         },
         raw: true,
      });

      req.user = {
         id: user.user_id,
         name: user.name,
         email: user.email,
         phone: user.phone,
         img: user.img
      }
   }

   next();
};