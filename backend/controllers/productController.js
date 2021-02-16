import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET 'api/products'
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    
    const keywordName = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    const keywordDescription = req.query.keyword ? {
        description:{
          $regex: req.query.keyword,
          $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({
        $and: [
            {
                $or: [
                    {...keywordName}, 
                    {...keywordDescription}
                ]
            },
            {
                $or: [
                    {isActive: null}, 
                    {isActive: true}
                ]
            }
          ]
        });
    
    const products = await Product.find({
        $and: [
            {
                $or: [
                    {...keywordName}, 
                    {...keywordDescription}
                ]
            },
            {
                $or: [
                    {isActive: null}, 
                    {isActive: true}
                ]
            }
          ]
        })
        .limit(pageSize)
        .skip(pageSize * (page -1))
        
    res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
        count,
        pageSize
    });
});

// @desc    Fetch product by Id
// @route   GET 'api/products/{id}'
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } 
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete product by Id
// @route   DELETE 'api/products/{id}'
// @access  Private + Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create product
// @route   POST 'api/products'
// @access  Private + Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        isActive: false
    });

    const createdProduct = await product.save();
    
    if (createdProduct) {
        res.status(201).json(createdProduct);
    }
    else {
        res.status(400);
        throw new Error('Product could not be created');
    }
});

// @desc    Update a product
// @route   PUT 'api/products/{id}'
// @access  Private + Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create new review
// @route   POST 'api/products/{id}/reviews'
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('You\'ve already reviewed this product');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added'});
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get top rated products
// @route   GET 'api/products/top'
// @access  Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product
        .find({})
        .sort({ rating: -1 })
        .limit(3)

    res.json(products);
});

// @desc    De-activate a product
// @route   PUT 'api/products/{id}/deactivate'
// @access  Private + Admin
const deActivateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = product.name;
        product.price = product.price;
        product.description = product.description;
        product.image = product.image;
        product.brand = product.brand;
        product.category = product.category;
        product.countInStock = product.countInStock;
        product.isActive = false;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    (Re-)Activate a product
// @route   PUT 'api/products/{id}/activate'
// @access  Private + Admin
const activateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = product.name;
        product.price = product.price;
        product.description = product.description;
        product.image = product.image;
        product.brand = product.brand;
        product.category = product.category;
        product.countInStock = product.countInStock;
        product.isActive = true;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Fetch inactive products
// @route   GET 'api/products/inactive'
// @access  Private + Admin
const getInactiveProducts = asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({
        isActive: false
    });
    
    const products = await Product.find({
            isActive: false
        })
        .limit(pageSize)
        .skip(pageSize * (page -1))
        
    res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
        count,
        pageSize
    });
});

export { 
    getProducts, 
    getProductById, 
    deleteProduct, 
    createProduct, 
    updateProduct, 
    createProductReview, 
    getTopRatedProducts,
    deActivateProduct,
    activateProduct,
    getInactiveProducts
};
