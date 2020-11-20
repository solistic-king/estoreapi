exports.handleError =  (error, next) => {
    if(!error.statusCode) {
        error.statusCode = 500;
    }
    next(error);
}