const adminGet = async (req, res) => {
   res.render('admin/dashboard', {
      title: 'Admin Panel',
      admin: req.admin
   })
}

const adminLoginGet = async (req, res) => {
   res.render('admin/login', {
      title: 'Admin Login'
   })
}

const adminExit = async (req, res) => {
   res.clearCookie('admin-token').redirect('/admin/login')
}

const adminOrdersGet = async (req, res) => {
   res.render('admin/order', {
      title: 'Orders'
   })
}

const adminProductsGet = async (req, res) => {
   res.render('admin/products', {
      title: 'Products'
   })
}

const adminCustomersGet = async (req, res) => {
   res.render('admin/customers', {
      title: 'Customers'
   })
}

module.exports = {
   adminLoginGet,
   adminGet,
   adminExit,
   adminOrdersGet,
   adminProductsGet,
   adminCustomersGet
}