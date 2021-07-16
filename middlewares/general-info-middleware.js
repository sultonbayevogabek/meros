module.exports = async (req, res, next) => {
   req.categories = await req.db.categories.findAll()

   next()
}