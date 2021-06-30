const { verifyToken } = require("../modules/jwt");

module.exports = async (req, res, next) => {
   const { users, sessions } = req.db;

   const token = req.cookies["token"];

   if (token) {
      let session;
      let a = verifyToken(token);
      const { user_agent, phone } = a;
      if (a) {
         console.log(a);
         session = await sessions.findOne({
            where: {
               user_agent,
            },
            include: users,
         });
      }

      if (!session || req.headers["user-agent"] !== user_agent) {
         return res.clearCookie("token").redirect("/");
      }

      const { user } = session;

      req.user = {
         id: user.user_id,
         name: user.name,
         email: user.email,
         phone: user.phone,
         img: user.img,
      };
   }

   next();
};
