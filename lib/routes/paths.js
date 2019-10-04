const router = require('express').Router();
const Product = require('../middlewares/products/products');

// Product Paths...
router.get('/product/admin-fetch-product',(req,res) => Product.ProductFetch(req,res));

router.post('/product/admin-delete-product-single',(req,res) => Product.DeleteProuctSingle(req,res));
router.post('/product/admin-delete-product-multiple',(req,res) => Product.DeleteProductMultiple(req,res));

router.post('/product/admin-update-product-single',(req,res) => Product.UpdateProductSingle(req,res));

router.post('/product/admin-add-product-single',(req,res) => Product.AddProductSingle(req,res));
router.post('/product/admin-add-product-multiple',(req,res) => Product.AddProductMultiple(req,res));

router.post('/product/admin-add-product-single',(req,res) => Product.AddProductSingle(req,res));
router.post('/product/admin-add-product-multiple',(req,res) => Product.AddProductMultiple(req,res));
// router.post('/product/admin-update-product-multiple',(req,res) => Product.UpdateProductMultiple(req,res));

module.exports = router;