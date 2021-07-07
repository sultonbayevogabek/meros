const adminGet = async (req, res) => {
   res.render('admin/dashboard', {
      title: 'Admin Panel',
      admin: req.admin,
      path: '/'
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
   res.render('admin/orders', {
      title: 'Orders',
      path: '/orders'
   })
}

const adminProductsGet = async (req, res) => {
   res.render('admin/products', {
      title: 'Products',
      path: '/products'
   })
}

const adminBrandsGet = async (req, res) => {
   res.render('admin/brands', {
      title: 'Brands',
      path: '/brands'
   })
}

const adminCategoriesGet = async (req, res) => {
   res.render('admin/categories', {
      title: 'Categories',
      path: '/categories'
   })
}

const adminCustomersGet = async (req, res) => {
   res.render('admin/customers', {
      title: 'Customers',
      path: '/customers'
   })
}

module.exports = {
   adminLoginGet,
   adminGet,
   adminExit,
   adminOrdersGet,
   adminProductsGet,
   adminCustomersGet,
   adminBrandsGet,
   adminCategoriesGet
}