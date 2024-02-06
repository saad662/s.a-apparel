const express = require("express");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    createProductReview,
    getAllProductReviews,
    deleteReview,
    getProducts,
    // getAdminProducts
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/Allproducts").get(getProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
// router.route("/admin/products").get(isAuthenticatedUser, authorizedRoles("admin"), getAdminProducts);

router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews")
    .get(getAllProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;