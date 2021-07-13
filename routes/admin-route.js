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
   ProductColorsPostController,
   ProductModelPostController,
   ProductsGetController,
   ProductsPatchController,
   ProductModelPatchValidation,
   ProductColorsPatchController,
   adminProductsGetController,

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
router.get("/api/categories", CategoriesGetController);
router.get("/api/categories-id/:id", CategoryGetById);
router.get("/categories", adminCategoriesGetController);
router.patch("/api/update/category", FileUpload(), CategoryPatchController);
router.post("/api/delete/category", CategoriesDeleteController);

router.post("/api/banners", FileUpload(), BannersPostController);
router.post("/api/brand", FileUpload(), BrandPostController);
router.post("/api/delete/brand", BrandDeleteController);
router.post("/api/update/brand", FileUpload(), BrandUpdateController);
router.get("/brands", adminBrandsGetController);
router.get("/api/brands", BrandsGetController);
router.get("/api/brands/:id", BrandGetByIdController)

router.post("/api/product", FileUpload(), ProductPostController);
router.get("/product", adminProductsGetController);
router.post("/api/product-brand", FileUpload(), ProductBrandPostController);
router.post("/api/product-color", FileUpload(), ProductColorsPostController);
router.post("/api/product-model", FileUpload(), ProductModelPostController);
router.get("/api/products", ProductsGetController);
router.patch("/api/update/product", FileUpload(), ProductsPatchController);

router.post("/api/sponsors", FileUpload(), SponsorsAddController);

router.get("/api/users", UsersGetController);
router.post("/api/users/make-admin", makeAdmin);
router.post("/api/users/remove-admin", removeAdmin);
router.get("/customers", adminCustomersGetController);

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
