const router = require('express').Router();
const Product = require('../middlewares/products/products');
const Auth = require('../middlewares/auth/super-admin/auth');
const Promocode = require('../middlewares/promocode')

// Product Paths...
router.get('/product/admin-fetch-product',(req,res) => Product.ProductFetch(req,res));

router.post('/product/admin-delete-product-single',(req,res) => Product.DeleteProuctSingle(req,res));
router.post('/product/admin-delete-product-multiple',(req,res) => Product.DeleteProductMultiple(req,res));

router.post('/product/admin-update-product-single',(req,res) => Product.UpdateProductSingle(req,res));

router.post('/product/admin-add-product-single',(req,res) => Product.AddProductSingle(req,res));
router.post('/product/admin-add-product-multiple',(req,res) => Product.AddProductMultiple(req,res));

router.post('/create-promo',(req,res) => Promocode.CreatePromocode(req,res));
router.post('/update-promo',(req,res) => Promocode.UpdatePromocode(req,res));
router.post('/delete-promo',(req,res) => Promocode.DeletePromocode(req,res));
router.post('/load-promo',(req,res) => Promocode.LoadCodes(req,res));
router.post('/change-status',(req,res) => Promocode.ChangeStatus(req,res));

router.post('/user/login',(req,res) => Auth.LoginHandler(req,res));

module.exports = router;