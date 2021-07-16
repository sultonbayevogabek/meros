const {
   adminGetController,

   adminOrdersGetController,
   OrdersGetController,
   OrdersPaymentPatchController,
   OrdersDeliveryPatchController,

   adminBrandsGetController,
   BrandDeleteController,
   BrandsGetController,
   BrandGetByIdController,
   BrandPostController,
   BrandUpdateController,

   CategoryGetById,
   CategoriesPostController,
   CategoriesDeleteController,
   adminCategoriesGetController,
   CategoriesGetController,
   CategoryPatchController,


   ProductPostController,
   ProductBrandPostController,
   ProductBrandsGetController,
   ProductBrandDeleteController,
   ProductBrandUpdateController,
   ProductBrandGetByIdController,
   ProductColorsPostController,
   ProductModelPostController,
   ProductsGetController,
   ProductsPatchController,
   ProductModelPatchValidation,
   ProductColorsPatchController,
   adminProductsGetController,
   ProductAddGetController,
   ProductsDeleteController,

   UsersGetController,
   adminCustomersGetController,

   makeAdmin,
   removeAdmin,

   BannersPostController,
   BannersDeleteController,


   SponsorsAddController,
   SettingsPatchController
} = require("../controllers/admin/admin-controller");

const AdminMiddleware = require("../middlewares/admin-middleware");
const FileUpload = require("express-fileupload");

const router = require("express").Router();

router.use(AdminMiddleware)

router.get("/", adminGetController);

router.get("/orders", adminOrdersGetController);
router.get("/api/orders", OrdersGetController);
router.patch("/api/orders-payment", OrdersPaymentPatchController);
router.patch("/api/orders-delivery", OrdersDeliveryPatchController);

router.post("/api/category", FileUpload(), CategoriesPostController);
router.get("/categories", CategoriesGetController);
router.get("/api/categories-id/:id", CategoryGetById);
router.patch("/api/update/category", FileUpload(), CategoryPatchController);
router.post("/api/delete/category", CategoriesDeleteController);

router.post("/api/banners", FileUpload(), BannersPostController);
router.post("/api/brand", FileUpload(), BrandPostController);
router.post("/api/delete/brand", BrandDeleteController);
router.post("/api/update/brand", FileUpload(), BrandUpdateController);
router.get("/brands", BrandsGetController);
router.get("/api/brands/:id", BrandGetByIdController)

router.post("/api/product", FileUpload(), ProductPostController);
router.get("/product", ProductsGetController);
router.post("/api/product-brands", ProductBrandPostController);
router.post("/api/product-brands/delete", ProductBrandDeleteController);
router.post("/api/product-brands/update", ProductBrandUpdateController);
router.get("/product-brands", ProductBrandsGetController);
router.get("/product-brands/:id", ProductBrandGetByIdController);
router.post("/api/product-color", FileUpload(), ProductColorsPostController);
router.post("/api/product-model", FileUpload(), ProductModelPostController);
router.get("/products", ProductsGetController);
router.get("/add-product", ProductAddGetController);
router.patch("/api/update/product", FileUpload(), ProductsPatchController);
router.post("/api/delete/product", ProductsDeleteController);

router.post("/api/sponsors", FileUpload(), SponsorsAddController);

router.post("/api/users/make-admin", makeAdmin);
router.post("/api/users/remove-admin", removeAdmin);
router.get("/customers", UsersGetController);

router.delete("/api/banners", BannersDeleteController);

router.patch("/api/settings", SettingsPatchController);

router.patch(
   "/update/product-color",
   FileUpload(),
   ProductColorsPatchController
);
router.patch(
   "/update/product-model",
   FileUpload(),
   ProductModelPatchValidation
);

module.exports = {
   path: "/admin",
   router,
};
