const categoryPostValidation = require("../../validations/category-post-validation");
const productPostValidation = require("../../validations/product-post-validation");
const path = require("path");
const slugify = require("slugify");
const productColorsPostValidation = require("../../validations/product-colors-post-validation");
const productModelPostValidation = require("../../validations/product-model-post-validation");
const productPatchValidation = require("../../validations/product-patch-validation");
const productModelPatchValidation = require("../../validations/product-model-patch-validation");
const productColorPatchValidation = require("../../validations/product-color-patch-validation");
const categoryPatchValidation = require("../../validations/category-patch-validation");
const settingsPatchValidation = require("../../validations/settings-patch-validation");
const fs = require("fs").promises;
const bannersPostValidation = require("../../validations/banners-post-validation");
const {Op} = require("sequelize");

module.exports = class AdminController {
   static async adminGetController(req, res) {
      res.render('admin/dashboard', {
         title: 'Admin Panel',
         admin: req.admin,
         path: '/'
      })
   }

   static async CategoriesPostController(req, res) {
      try {
         const {uz_name, ru_name, en_name} =
            await categoryPostValidation.validateAsync(req.body);

         let category = await req.db.categories.findOne({
            where: {
               [Op.or]: [
                  {uz_name: uz_name.toLowerCase()},
                  {ru_name: ru_name.toLowerCase()},
                  {en_name: en_name.toLowerCase()}
               ]
            },
            raw: true
         })

         if (category) {
            throw new Error("Category name must be unique");
         }

         if (!(req?.files?.thumb || req?.files?.icon_thumb)) {
            throw new Error("Category thumb and icon thumb is required");
         }

         let thumb = req.files.thumb;
         let icon_thumb = req.files.icon_thumb;

         if (
            thumb.mimetype.split("/")[0] !== "image" &&
            thumb.mimetype.split("/")[0] !== "vector" &&
            icon_thumb.mimetype.split("/")[0] !== "image" &&
            icon_thumb.mimetype.split("/")[0] !== "vector"
         ) {
            throw new Error("Please upload image");
         }

         await thumb.mv(
            path.join(
               __dirname,
               "..",
               "..",
               "public",
               "images",
               "categories",
               `${thumb.md5}.${thumb.mimetype.split("/")[1]}`
            ),
            (err) => {
            }
         );

         await icon_thumb.mv(
            path.join(
               __dirname,
               "..",
               "..",
               "public",
               "images",
               "categories-icons",
               `${icon_thumb.md5}.${icon_thumb.mimetype.split("/")[1].substr(0, 3)}`
            ),
            (err) => {
            }
         );

         category = await req.db.categories.create({
            uz_name,
            ru_name,
            en_name,
            thumb: `${thumb.md5}.${thumb.mimetype.split("/")[1]}`,
            icon_thumb: `${icon_thumb.md5}.${
               icon_thumb.mimetype.split("/")[1].substr(0, 3)
            }`,
            slug: slugify(uz_name.toLowerCase())
         })

         category = await category.dataValues;

         res.status(200).json({
            ok: true,
            message: "published",
            result: {
               category,
            },
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async CategoryGetById(req, res) {
      try {
         const id = req.params.id

         console.log(id)

         const category = await req.db.categories.findOne({
            where: {
               category_id: id
            }
         })

         res.status(200).json({
            ok: true,
            category
         })
      } catch (e) {
         res.status(404).json({
            ok: false,
            message: 'not found',
         });
      }
   }
   static async CategoriesDeleteController(req, res) {
      try {
         const {id} = req.body
         console.log(id)

         await req.db.categories.destroy({
            where: {
               category_id: id
            }
         })

         res.json({
            message: 'deleted'
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async CategoriesGetController(req, res) {
      try {
         let {p_page, c_page} = req.query;
         if (!(p_page || c_page)) {
            p_page = 10
            c_page = 1
         }
         if (Number(p_page) === NaN || Number(c_page) === NaN) {
            throw new Error("invalid c_page and p_page options");
         }

         const totalCount = await req.db.categories.count()

         const categories = await req.db.categories.findAll({
            raw: true,
            limit: p_page,
            offset: p_page * (c_page - 1)
         })

         for (let category of categories) {
            let brands = await req.db.brands.findAll({
               where: {
                  category_id: category.category_id,
               },
               raw: true,
            });
            category.brands = brands;
         }

         res.render('admin/categories', {
            title: 'Admin | Categories',
            categories,
            totalCount
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async CategoryPatchController(req, res) {
      try {
         console.log(req.files)
         console.log(req.body)
         const {uz_name, ru_name, en_name, category_id} =
            await categoryPatchValidation.validateAsync(req.body)

         let category = await req.db.categories.findOne({
            where: {
               slug: slugify(uz_name.toLowerCase())
            },
            raw: true
         })

         const c = await req.db.categories.findOne({
            where: {
               category_id
            },
            raw: true
         })

         if (c.slug !== category?.slug) {
            if (category) {
               throw new Error("Category name must be unique");
            }
         }

         let thumb
         let icon_thumb

         if (req.files) {
            if (req.files.thumb) {
               thumb = req.files.thumb

               if (
                  thumb.mimetype.split("/")[0] !== "image" &&
                  thumb.mimetype.split("/")[0] !== "vector"
               ) {
                  throw new Error("Please upload image");
               }

               await thumb.mv(
                  path.join(
                     __dirname,
                     "..",
                     "..",
                     "public",
                     "images",
                     "categories",
                     `${thumb.md5}.${thumb.mimetype.split("/")[1]}`
                  ),
                  (err) => {
                  }
               )
            }

            if (req.files.icon_thumb) {
               icon_thumb = req.files.icon_thumb;

               if (
                  icon_thumb.mimetype.split("/")[0] !== "image" &&
                  icon_thumb.mimetype.split("/")[0] !== "vector"
               ) {
                  throw new Error("Please upload image");
               }

               await icon_thumb.mv(
                  path.join(
                     __dirname,
                     "..",
                     "..",
                     "public",
                     "images",
                     "categories-icons",
                     `${icon_thumb.md5}.${icon_thumb.mimetype.split("/")[1]}`
                  ),
                  (err) => {
                  }
               );
            }

         }

         category = await req.db.categories.update(
            {
               uz_name,
               ru_name,
               en_name,
               thumb: thumb ? `${thumb.md5}.${thumb.mimetype.split("/")[1]}` : c.thumb,
               icon_thumb: icon_thumb ? `${icon_thumb.md5}.${
                  icon_thumb.mimetype.split("/")[1].substr(0, 3)
               }` : c.icon_thumb,
               slug: slugify(uz_name.toLowerCase())
            },
            {
               where: {
                  category_id,
               },
               raw: true,
               returning: true,
            }
         );

         category = await category[1][0];

         res.status(200).json({
            ok: true,
            message: "published",
            result: {
               category,
            },
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }

   static async BrandPostController(req, res) {
      try {
         const {brand_name, brand_site, category_id} = req.body;

         let brand = await req.db.brands.findOne({
            where: {
               brand_name: brand_name,
            },
         });

         if (brand) {
            throw new Error("This brand has already added");
         }

         if (!brand_name && !category_id) {
            throw new Error("category_id and brand name is required");
         }

         const thumb = req?.files?.brand_thumb;

         if (!thumb) throw new Error("Thumb is not found");

         const mimetype = thumb.mimetype.split("/");

         if (mimetype[0] !== "image" && mimetype[0] !== "vector") {
            throw new Error("invalid file type for thumb");
         }

         const thumb_name = thumb.md5;
         const thumb_path = path.join(
            __dirname,
            "..",
            "..",
            "public",
            "images",
            "catalog-brands",
            `${thumb_name}.${mimetype[1]}`
         );

         await thumb.mv(thumb_path);

         brand = await req.db.brands.create({
            brand_name,
            brand_thumb: `${thumb_name}.${mimetype[1]}`,
            brand_site,
            category_id,
         });

         brand = await brand.dataValues;

         res.status(201).json({
            ok: true,
            message: "published",
            result: {
               brand,
            },
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async BrandDeleteController(req, res) {
      try {
         const {id} = req.body
         await req.db.brands.destroy({
            where: {
               brand_id: id
            }
         })
         res.send({
            ok: true,
            message: 'deleted'
         })
      } catch (e) {
         res.send(400).json({
            ok: false
         })
      }
   }
   static async BrandsGetController(req, res) {
      try {
         let {p_page, c_page} = req.query
         if (!(p_page || c_page)) {
            p_page = 10
            c_page = 1
         }
         if (Number(p_page) === NaN || Number(c_page) === NaN) {
            throw new Error("invalid c_page and p_page options");
         }

         const totalCount = await req.db.brands.count()
         const categories = await req.db.categories.findAll()

         const brands = await req.db.brands.findAll({
            raw: true,
            limit: p_page,
            offset: p_page * (c_page - 1),
            include: {
               model: req.db.categories
            }
         })

         res.render('admin/brands', {
            title: 'Admin | Brands',
            brands,
            totalCount,
            categories
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async BrandGetByIdController(req, res) {
      try {
         const id = req.params.id
         const brand = await req.db.brands.findOne({
            where: {
               brand_id: id
            }
         })
         const categories = await req.db.categories.findAll()

         res.status(200).json({
            ok: true,
            result: {
               brand,
               categories
            }
         })
      } catch (e) {
         res.status(404).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async BannersPostController(req, res) {
      try {
         const {banner_name} = bannersPostValidation.validateAsync(
            req.body
         );

         const banner = req.files?.img;

         if (!banner) throw new Error("Banner image is not found");

         const type = banner.mimetype.split("/")[0];
         const format = banner.mimetype.split("/")[1];

         if (type !== "image" && type !== "vector") {
            throw new Error(
               "Banner image type must be an image or svg vector"
            );
         }

         const banner_path = path.join(
            __dirname,
            "..",
            "public",
            "images",
            "banner",
            `${banner.md5}.${format}`
         );

         await banner.mv(banner_path, (err) => {
            if (err) {
               throw new Error(err);
            }
         });

         let banners = await fs.readFile(
            path.join(__dirname, "..", "banners.json"),
            {encoding: "utf-8"}
         );

         banners = await JSON.parse(banners);
         banners[req.body.banner_name] = `${banner.md5}.${format}`;

         await fs.writeFile(
            path.join(__dirname, "..", "banners.json"),
            JSON.stringify(banners),
            {encoding: "utf-8"}
         );

         res.status(201).json({
            ok: true,
            message: "POSTED",
            result: {
               banners,
            },
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async BannersDeleteController(req, res) {
      try {
         const {banner_name} = await bannersPostValidation.validateAsync(
            req.body
         );

         let banners = await fs.readFile(
            path.join(__dirname, "..", "banners.json"),
            {encoding: "utf-8"}
         );

         banners = await JSON.parse(banners);
         banners[req.body.banner_name] = "";

         await fs.writeFile(
            path.join(__dirname, "..", "banners.json"),
            JSON.stringify(banners),
            {encoding: "utf-8"}
         );

         res.status(200).json({
            ok: true,
            message: "UPDATED",
            result: {banners},
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async BrandUpdateController(req, res) {
      try {
         const { brand_name, brand_site, brand_id, category_id } = req.body

         if (!brand_name || !brand_site || !brand_id || !category_id) {
            throw new Error("brand_id and brand name is required")
         }

         let brand = await req.db.brands.findOne({
            where: {
               brand_id
            }
         });

         if (!brand) {
            throw new Error("Unknown brand");
         }

         let thumb = req?.files?.brand_thumb,
            thumb_name, mimetype

         if (thumb) {
            mimetype = thumb.mimetype.split("/");

            if (mimetype[0] !== "image" && mimetype[0] !== "vector") {
               throw new Error("invalid file type for thumb");
            }

            thumb_name = thumb.md5;
            const thumb_path = path.join(
               __dirname,
               "..",
               "..",
               "public",
               "images",
               "catalog-brands",
               `${thumb_name}.${mimetype[1]}`
            );

            await thumb.mv(thumb_path);
         }

         brand = await req.db.brands.update({
            brand_name,
            brand_thumb: thumb ? `${thumb_name}.${mimetype[1]}` : brand.thumb,
            brand_site,
            category_id
         }, {
            where: {
               brand_id
            }
         });

         res.status(201).json({
            ok: true,
            message: "published",
            result: {
               brand,
            },
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }

   static async ProductPostController(req, res) {
      try {
         const {
            uz_name,
            en_name,
            ru_name,
            price,
            sale,
            uz_description,
            ru_description,
            en_description,
            category_id,
            product_brand_id,
            options
         } = await productPostValidation.validateAsync(req.body);

         let product = await req.db.products.findOne({
            where: {
               slug: slugify(uz_name.toLowerCase()),
            },
         });

         if (product) {
            throw new Error("Product slug must be unique");
         }

         if (req?.files?.length < 1) {
            throw new Error("Product thumb is required");
         }
         let arr = [];
         for (let i in req.files) {
            let thumb = req.files[i];
            if (
               thumb.mimetype.split("/")[0] !== "image" &&
               thumb.mimetype.split("/")[0] !== "vector"
            ) {
               throw new Error("Thumb must be image");
            }
            let type = thumb.mimetype.split("/")[1];
            const thumb_path = path.join(
               __dirname,
               "..",
               "..",
               "public",
               "images",
               "products",
               `${thumb.md5}.${type}`
            );

            await thumb.mv(thumb_path, (err) => {
            });

            arr.push(`${thumb.md5}.${type}`);
         }

         product = await req.db.products.create({
            slug: slugify(uz_name.toLowerCase()),
            uz_name,
            ru_name,
            en_name,
            price,
            sale,
            uz_description,
            ru_description,
            en_description,
            thumb: arr,
            category_id,
            product_brand_id,
            options
         });

         product = await product.dataValues;

         res.status(201).json({
            ok: true,
            message: "published",
            product
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + ""
         });
      }
   }
   static async ProductBrandPostController(req, res) {
      try {
         const { brand_name } = req.body
         if (!brand_name) throw new Error("Invalid Brand name");

         let brand = await req.db.product_brands.create({
            brand_name
         })

         brand = await brand.dataValues;

         res.status(201).json({
            ok: true,
            message: "published",
            result: {
               brand
            }
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async ProductBrandsGetController(req, res) {
      try {
         let { p_page, c_page } = req.query
         if (!(p_page || c_page)) {
            p_page = 20
            c_page = 1
         }
         if (Number(p_page) === NaN || Number(c_page) === NaN) {
            throw new Error("invalid c_page and p_page options");
         }

         const totalCount = await req.db.product_brands.count()

         const productBrands = await req.db.product_brands.findAll({
            raw: true,
            limit: p_page,
            offset: p_page * (c_page - 1)
         })

         res.render('admin/product-brands', {
            title: 'Admin | Products brands',
            productBrands,
            totalCount
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async ProductBrandDeleteController(req, res) {
      try {
         const { product_brand_id } = req.body
         await req.db.product_brands.destroy({
            where: {
               product_brand_id
            }
         })
         res.status(200).json({
            ok: true,
            message: 'deleted'
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: 'bad request'
         })
      }
   }
   static async ProductBrandUpdateController(req, res) {
      try {
         const { product_brand_name, product_brand_id } = req.body
         console.log(req.body)
         await req.db.product_brands.update({
            brand_name: product_brand_name
         }, {
            where: {
               product_brand_id: product_brand_id
            }
         })
         res.status(200).json({
            ok: true,
            message: 'updated'
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: 'bad request'
         })
      }
   }
   static async ProductBrandGetByIdController(req, res) {
      try {
         const productBrand = await req.db.product_brands.findOne({
            where: {
               product_brand_id: req.params.id
            }
         })
         res.status(200).json({
            ok: true,
            productBrand
         })
      } catch (e) {
         res.status(404).json({
            ok: false,
            message: 'not found'
         })
      }
   }
   static async ProductColorsPostController(req, res) {
      try {
         const { product_color_name, product_id} =
            await productColorsPostValidation.validateAsync(req.body);
         if (!req.files) throw new Error("Thumb is required");
         let thumb = req.files?.thumb;
         if (!thumb) throw new Error("Thumb is required");
         let type = thumb.mimetype.split("/");

         if (type[0] !== "image" && type[0] !== "vector") {
            throw new Error("thumb type must be an image");
         }

         let thumb_path = path.join(
            __dirname,
            "public",
            "images",
            "products",
            `${thumb.md5}.${type[1]}`
         );

         await thumb.mv(thumb_path, (err) => {
         });

         let product_color = await req.db.product_colors.create({
            product_color_name,
            thumb: `${thumb.md5}.${type[1]}`,
            product_id,
         });

         product_color = await product_color.dataValues;

         res.status(201).json({
            ok: true,
            result: {
               product_color,
            },
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async ProductModelPostController(req, res) {
      try {
         const {name, difference, difference_price, product_id} =
            await productModelPostValidation.validateAsync(req.body);

         let product_model = await req.db.models.create({
            product_id,
            name,
            difference,
            difference_price,
         });

         res.status(201).json({
            ok: true,
            message: "created",
            result: {
               model: product_model,
            },
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async ProductsGetController(req, res) {
      try {
         let { p_page, c_page, category_slug } = req.query
         let products
         if (!(p_page || c_page)) {
            p_page = 10
            c_page = 1
         }
         if (Number(p_page) === NaN || Number(c_page) === NaN) {
            throw new Error("invalid c_page and p_page options");
         }

         let totalCount

         if (category_slug === "all") {
            products = await req.db.products.findAll({
               raw: true,
               limit: p_page,
               offset: p_page * (c_page - 1),
               include: [
                  {
                     model: req.db.categories,
                  },

                  {
                     model: req.db.product_brands,
                  }
               ]
            })

            totalCount = await req.db.products.count()
         } else {
            let category = await req.db.categories.findOne({
               where: {
                  slug: category_slug.toLowerCase()
               },
               raw: true
            })

            if (!category) {
               throw new Error("Invalid category");
            }

            products = await req.db.products.findAll({
               where: {
                  category_id: category.category_id,
               },
               raw: true,
               limit: p_page,
               offset: p_page * (c_page - 1),
               include: [
                  {
                     model: req.db.categories,
                  },
                  {
                     model: req.db.product_brands,
                  },
               ]
            })

            totalCount = await req.db.products.count()
         }

         for (let product of products) {
            let model = await req.db.models.findAll({
               where: {
                  product_id: product.product_id,
               },
               raw: true,
            });
            let colors = await req.db.product_colors.findAll({
               where: {
                  product_id: product.product_id,
               },
               raw: true,
            });
            product.models = model;
            product.colors = colors;
         }

         res.render('admin/products', {
            title: 'Admin | Products',
            products,
            totalCount
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async ProductAddGetController(req, res) {
      try {
         const categories = await req.db.categories.findAll(),
            productBrands = await req.db.product_brands.findAll()

         res.render('admin/add-product', {
            categories,
            productBrands,
            title: 'Admin | Add product'
         })

      } catch (e) {
         res.status(400).json({
            ok: false,
            message: 'bad request'
         })
      }
   }
   static async ProductsPatchController(req, res) {
      try {
         const {
            uz_name,
            en_name,
            ru_name,
            price,
            sale,
            uz_description,
            ru_description,
            en_description,
            category_id,
            product_brand_id,
            options,
            product_id,
         } = await productPatchValidation.validateAsync(req.body);

         let product = await req.db.products.findOne({
            where: {
               slug: slugify(uz_name.toLowerCase()),
            },
         });

         let p = await req.db.products.findOne({
            where: {
               product_id,
            },
            raw: true,
         });

         if (p.slug !== product?.slug) {
            if (product) {
               throw new Error("Change product name");
            }
         }

         if (req?.files?.length < 1) {
            throw new Error("Product thumb is required");
         }

         let arr = [];
         for (let i in req.files) {
            let thumb = req.files[i];
            if (
               thumb.mimetype.split("/")[0] !== "image" &&
               thumb.mimetype.split("/")[0] !== "vector"
            ) {
               throw new Error("Thumb must be image");
            }
            let type = thumb.mimetype.split("/")[1];
            const thumb_path = path.join(
               __dirname,
               "..",
               "public",
               "images",
               "products",
               `${thumb.md5}.${type}`
            );

            await thumb.mv(thumb_path, (err) => {
            });

            arr.push(`${thumb.md5}.${type}`);
         }

         product = await req.db.products.update(
            {
               slug: slugify(uz_name.toLowerCase()),
               uz_name,
               ru_name,
               en_name,
               price,
               sale,
               uz_description,
               ru_description,
               en_description,
               thumb: arr,
               category_id,
               product_brand_id,
               options
            },
            {
               where: {
                  product_id,
               },
               raw: true,
               returning: true,
            }
         );

         if (product[0] === 1) {
            product = product[1][0];
         } else {
            product = null;
         }

         res.status(201).json({
            ok: true,
            product,
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async ProductModelPatchValidation(req, res) {
      try {
         const {name, difference, difference_price, model_id} =
            await productModelPatchValidation.validateAsync(req.body);

         const model = await req.db.models.update(
            {
               name,
               difference,
               difference_price,
            },
            {
               where: {
                  model_id,
               },
               raw: true,
               returning: true,
            }
         );

         res.status(200).json({
            ok: true,
            model: model[1][0],
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async ProductColorsPatchController(req, res) {
      try {
         const {product_color_name, product_color_id} =
            await productColorPatchValidation.validateAsync(req.body);

         if (!req.files) throw new Error("Thumb is required");

         let thumb = req.files?.thumb;
         if (!thumb) throw new Error("Thumb is required");
         let type = thumb.mimetype.split("/");

         if (type[0] !== "image" && type[0] !== "vector") {
            throw new Error("thumb type must be an image");
         }

         let thumb_path = path.join(
            __dirname,
            "public",
            "images",
            "products",
            `${thumb.md5}.${type[1]}`
         );

         await thumb.mv(thumb_path, (err) => {
         });

         let product_color = await req.db.product_colors.update(
            {
               product_color_name,
               thumb: `${thumb.md5}.${type[1]}`,
            },
            {
               where: {
                  product_color_id,
               },
               raw: true,
               returning: true,
            }
         );

         product_color = product_color[1][0];

         res.status(201).json({
            ok: true,
            result: {
               product_color,
            },
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async ProductsDeleteController(req, res) {
      try {
         const { id } = req.body

         await req.db.products.destroy({
            where: {
               product_id: id
            }
         })

         res.status(200).json({
            ok: true,
            message: 'deleted'
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: 'bad request'
         })
      }
   }

   static async UsersGetController(req, res) {
      try {
         let {c_page, p_page} = req.query

         if (!(p_page || c_page)) {
            p_page = 20
            c_page = 1
         }

         if (Number(p_page) === NaN || Number(c_page) === NaN) {
            throw new Error("invalid c_page and p_page options");
         }

         let users

         if (req.user.role === 'admin') {
            users = await req.db.users.findAll({
               raw: true,
               limit: p_page,
               offset: p_page * (c_page - 1),
               where: {
                  role: {
                     [Op.and]: {
                        [Op.ne]: 'admin',
                        [Op.ne]: 'superadmin'
                     }
                  }
               }
            })
         } else {
            users = await req.db.users.findAll({
               raw: true,
               limit: p_page,
               offset: p_page * (c_page - 1),
               where: {
                  role: {
                     [Op.ne]: 'superadmin'
                  }
               }
            })
         }

         const totalCount = await req.db.users.count()

         res.render('admin/customers', {
            title: 'Admin | Users',
            users,
            totalCount,
            currentUserRole: req.user.role
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async makeAdmin(req, res) {
      try {
         const {user_id} = req.body;

         let user = await req.db.users.update({
               role: "admin",
            }, {
               where: {user_id},
               raw: true,
               returning: true,
            }
         )

         user = await user[1][0]

         res.status(200).json({
            ok: true,
            user: user
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + ""
         })
      }
   }
   static async removeAdmin(req, res) {
      try {
         const {user_id} = req.body;

         let user = await req.db.users.update({
               role: "user",
            }, {
               where: {user_id},
               raw: true,
               returning: true,
            }
         )

         user = await user[1][0]

         res.status(200).json({
            ok: true,
            user: user
         })
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + ""
         })
      }
   }

   static async adminOrdersGetController(req, res) {
      const orders = await req.db.orders.findAll()
      console.log(orders)
      res.render('admin/orders', {
         title: 'Orders',
         path: '/orders',
         orders: orders
      })
   }
   static async OrdersGetController(req, res) {
      try {
         let orders = await req.db.orders.findAll({
            raw: true,
         });

         for (let order of orders) {
            let order_items = await req.db.order_details.findAll({
               where: {
                  order_id: order.order_id,
               },
               include: {
                  model: req.db.products,
               },
               raw: true,
            });
            order.items = order_items;
         }

         res.status(200).json({
            ok: true,
            result: {
               orders,
            },
         });
      } catch (e) {
         res.status(403).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async OrdersPaymentPatchController(req, res) {
      try {
         const {order_id, is_payed} = req.body;

         let order = await req.db.orders.update(
            {
               is_payed: is_payed,
            },
            {
               where: {
                  order_id,
               },
               raw: true,
               returning: true,
            }
         );

         if (order[1]) {
            order = await order[1][0];
         }

         res.status(200).json({
            ok: true,
            order: order,
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async OrdersDeliveryPatchController(req, res) {
      try {
         const {order_id, is_shipped} = req.body;

         let order = await req.db.orders.update(
            {
               is_shipped: is_shipped,
            },
            {
               where: {
                  order_id,
               },
               raw: true,
               returning: true,
            }
         );

         if (order[1]) {
            order = await order[1][0];
         }

         res.status(200).json({
            ok: true,
            order: order,
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async SponsorsAddController(req, res) {
      try {
         const {brand_name} = req.body;

         const logo = req.files?.logo;

         if (!logo) throw new Error("logo is required");

         const type = logo.mimetype.split("/")[0];
         const format = logo.mimetype.split("/")[1];

         if (type !== "image" && type !== "vector") {
            throw new Error("Logo type must be an image or svg vector");
         }

         const logo_path = path.join(
            __dirname,
            "..",
            "public",
            "images",
            "logos",
            `${logo.md5}.${format}`
         );

         await logo.mv(logo_path, (err) => {
            if (err) {
               throw new Error(err);
            }
         });

         let sponsor = await req.db.sponsors.create({
            brand_name: brand_name,
            brand_logo: `${logo.md5}.${format}`,
         });

         sponsor = await sponsor.dataValues;

         res.status(201).json({
            ok: true,
            message: "created",
            result: {sponsor},
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async SponsorsDeleteController(req, res) {
      try {
         const {sponsor_id} = req.body;

         let sponsor = await req.db.sponsors.findOne({
            where: {
               sponsor_id,
            },
            raw: true,
         });

         if (!sponsor) throw new Error("Sponsor is not found");

         await req.db.destroy({
            where: {
               sponsor_id,
            },
         });

         res.status(200).json({
            ok: true,
            message: "deleted",
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
   static async SettingsPatchController(req, res) {
      try {
         let data = await settingsPatchValidation.validateAsync(req.body);

         let response = await fs.readFile(
            path.join(__dirname, "..", "settings.json"),
            {encoding: "utf-8"}
         );

         response = await JSON.parse(response);

         data = {
            ...response,
            ...data,
         };

         await fs.writeFile(
            path.join(__dirname, "..", "settings.json"),
            JSON.stringify(data),
            {encoding: "utf-8"}
         );

         res.status(200).json({
            ok: true,
            message: "updated",
            result: {
               settings: data,
            },
         });
      } catch (e) {
         res.status(400).json({
            ok: false,
            message: e + "",
         });
      }
   }
}
