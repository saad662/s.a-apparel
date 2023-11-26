const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a new product (Admin only).
const createProduct = catchAsyncErrors(
    async (req, res) => {
        req.body.user = req.user.id;
        const product = await Product.create(req.body);

        res.status(201).json({
            sucess: true,
            product
        });
    }
);

// Get all products.
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await apiFeature.query;

    const productsCount = await Product.countDocuments(apiFeature.query.getQuery());

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
    });
});

// Update a product (Admin only).
const updateProduct = (
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );
        res.status(200).json({
            sucess: true,
            product
        });
    }
);

// Get details of a single product.
const getProduct = (
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        res.status(200).json({
            sucess: true,
            product
        });
    }
);

// Delete a product (Admin only).
const deleteProduct = (
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        //console.log(product);
        //await product.remove();
        await product.deleteOne();
        res.status(200).json({
            sucess: true,
            message: "Product Deleted Successfully"
        });
    }
);

// Create or update a product review.
const createProductReview = catchAsyncErrors(
    async (req, res) => {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };

        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        // Check if the user has already reviewed the product
        const isReviewed = product.reviews.find(
            (reviewbyuser) => reviewbyuser.user.toString() === req.user._id.toString()
        );

        if (isReviewed) {
            product.reviews.forEach((reviewbyuser) => {
                if (reviewbyuser.user.toString() === req.user._id.toString())
                    (reviewbyuser.rating = rating), (reviewbyuser.comment = comment);
            });
        } else {
            // Create a new review
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        // Calculate the average rating for the product
        product.ratings =
            product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: "Review added/updated successfully",
        });
    }
);

// Get all reviews of a product.
const getAllProductReviews = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.query.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        const reviews = product.reviews;
        res.status(200).json({
            success: true,
            numOfReviews: product.numOfReviews,
            reviews,
        });
    }
);

// Delete a review for a product.
const deleteProductReview = catchAsyncErrors(
    async (req, res, next) => {
        const productId = req.query.id;
        const reviewId = req.query.reviewId;

        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        const reviewIndex = product.reviews.findIndex(
            (review) => review._id.toString() === reviewId
        );

        if (reviewIndex === -1) {
            return next(new ErrorHandler("Review not found", 404));
        }

        product.reviews.splice(reviewIndex, 1);
        product.numOfReviews = product.reviews.length;

        // Recalculate the average rating for the product
        if (product.reviews.length === 0) {
            product.ratings = 0;
        } else {
            product.ratings =
                product.reviews.reduce((acc, review) => review.rating + acc, 0) /
                product.reviews.length;
        }

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    }
);

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    createProductReview,
    getAllProductReviews,
    deleteProductReview
};