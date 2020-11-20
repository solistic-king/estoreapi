const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products: products });
    } catch (error) {
        handleError(error, next);
    }
}

exports.getProduct = async (req, res, next) => {
    const productId = req.params.productId;
    console.log(productId);
    try {
        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error('Could not find product.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Product found.', product: product });
    } catch (error) {
        handleError(error, next);
    }
}

exports.createProduct = async (req, res, next) => {
    console.log(req.body)
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    try {
        const product = new Product({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        });
        await product.save();
        res.status(201).json({ message: 'Product created.' });
    } catch (error) {
        handleError(error, next);
    }
}

exports.updateProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error('Could not find product.');
            error.statusCode = 404;
            throw error;
        }
        product.title = title;
        product.price = price;
        product.imageUrl = imageUrl;
        product.description = description;
        await product.save();
        res.status(200).json({ message: 'Product updated.' });
    } catch (error) {
        handleError(error, next);
    }
}

exports.deleteProduct = async (req, res, next) => {
    const productId = req.params.productId  
    try {
        const post = await Product.findById(productId);
        if (!post) {
            const error = new Error('Could not find product.');
            error.statusCode = 404;
            throw error;
        }
        await Product.findByIdAndRemove(productId);
        res.status(200).json({ message: 'Product deleted.' })
    } catch (error) {
        handleError(error, next);
    }

    // TODO: pass user id on request to remove product from user's cart
}

const handleError = (error, next) => {
    if(!error.statusCode) {
        error.statusCode = 500;
    }
    next(error);
}