const Category = require('../models/category');
const Product = require('../models/product');

const handleError = require('../middleware/errorHandler').default;

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories: categories });
    } catch (error) {
        handleError(error, next);
    }
}

exports.getCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Category found.', category: category });
    } catch (error) {
        handleError(error, next);
    }
}

exports.createCategory = async (req, res, next) => {
    console.log(req.body)
    const title = req.body.title;
    const description = req.body.description;
    const isPrimary = req.body.isPrimary;

    try {
        const category = new Category({
            title,
            description,
            isPrimary
        });
        await category.save();
        res.status(201).json({ message: 'Category created.' });
    } catch (error) {
        handleError(error, next);
    }
}

exports.getProductsByCategoryId = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    try {
        const products = await Product.find({ "categories" : categoryId });
        if (!products) {
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Products by category ', products: products });
    } catch (error) {
        handleError(error, next);
    }
}