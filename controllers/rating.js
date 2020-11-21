const Product = require('../models/product');
const Rating = require('../models/rating');

const handleError = require('../middleware/errorHandler').default;

exports.getProductRating = async (req, res, next) => {
    const productId = req.params.productId;
    console.log(productId);
    try {
        const ratings = await Rating.find({ product : productId }).populate('product').populate('user');
        if (!ratings) {
            const error = new Error('somthing went wrong.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Ratings -- ', ratings: ratings });
    } catch (error) {
        handleError(error, next);
    }
}

exports.createProductRating = async (req, res, next) => {
    console.log(req.body)
    const userId = req.userId;
    const productId = req.params.productId;
    const rating = req.body.rating;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error('Could not find product.');
            error.statusCode = 404;
            throw error;
        }

        if(!product.rating){
            product.rating = {
                numOfRatings : 1,
                current : rating
            }
        }else {
            product.rating = {
                numOfRatings : product.rating.numOfRatings + 1,
                current : ( product.rating.current + rating )/ 2
            }
        }

        const newRating = new Rating({
            product: productId,
            user: userId,
            rating: rating
        })

        await newRating.save();
        await product.save();
        res.status(201).json({ message: 'Rating added' });
    } catch (error) {
        handleError(error, next);
    }
}