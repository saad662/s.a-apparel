const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create a new product (Admin only).
const createProduct = catchAsyncErrors(
    async (req, res) => {
        let images = [];

        if (req.body.images instanceof Array) {
            images = req.body.images;
        } else if (typeof req.body.images === "string") {
            images.push(req.body.images);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
        req.body.user = req.user.id;
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    }
);

// Get all products.
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 12;

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

// Get All Product (Admin)
// const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
//     const products = await Product.find();

//     res.status(200).json({
//         success: true,
//         products,
//     });
// });

// Get all products.
const getProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 12;

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()

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

        // Images Start Here
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        if (images !== undefined) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.images = imagesLinks;
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            product,
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

        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

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

// Delete Review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});

module.exports = {
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
};