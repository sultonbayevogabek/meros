const {
   adminGetController,
   adminOrdersGetController,
   adminProductsGetController,
   adminBrandsGetController,
   CategoryGetById,
   BrandDeleteController,
   BrandsGetController,
   adminCategoriesGetController,
   adminCustomersGetController,
   CategoriesPostController,
   CategoriesDeleteController,
   ProductPostController,
   ProductBrandPostController,
   BrandPostController,
   ProductColorsPostController,
   ProductModelPostController,
   ProductsGetController,
   CategoriesGetController,
   UsersGetController,
   ProductsPatchController,
   ProductModelPatchValidation,
   ProductColorsPatchController,
   CategoryPatchController,
   SponsorsAddController,
   SettingsPatchController,
   BannersPostController,
   BannersDeleteController,
   OrdersGetController,
   OrdersPaymentPatchController,
   OrdersDeliveryPatchController,
} = require("../controllers/admin/admin-controller");

const AdminMiddleware = require("../middlewares/admin-middleware");
const FileUpload = require("express-fileupload");

const router = require("express").Router();

router.use(AdminMiddleware)

router.get("/", adminGetController);
router.get("/orders", adminOrdersGetController);
router.get("/api/orders", OrdersGetController);
router.post("/api/category", FileUpload(), CategoriesPostController);
router.post("/api/product", FileUpload(), ProductPostController);
router.get("/product", adminProductsGetController);
router.post("/api/product-brand", FileUpload(), ProductBrandPostController);
router.post("/api/banners", FileUpload(), BannersPostController);
router.post("/api/brand", FileUpload(), BrandPostController);
router.post("/api/delete/brand", BrandDeleteController);
router.get("/brands", adminBrandsGetController);
router.get("/api/brands", BrandsGetController);
router.post("/api/product-color", FileUpload(), ProductColorsPostController);
router.post("/api/product-model", FileUpload(), ProductModelPostController);
router.post("/api/sponsors", FileUpload(), SponsorsAddController);
router.get("/api/products", ProductsGetController);
router.get("/api/categories", CategoriesGetController);
router.get("/api/categories-id/:id", CategoryGetById);
router.get("/categories", adminCategoriesGetController);
router.get("/api/users", UsersGetController);
router.get("/users", adminCustomersGetController);
router.delete("/api/banners", BannersDeleteController);
router.patch("/api/update/product", FileUpload(), ProductsPatchController);
router.patch("/api/update/category", FileUpload(), CategoryPatchController);
router.post("/api/delete/category", CategoriesDeleteController);
router.patch("/api/settings", SettingsPatchController);
router.patch("/api/orders-payment", OrdersPaymentPatchController);
router.patch("/api/orders-delivery", OrdersDeliveryPatchController);
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
