const globalErrorHandler = (err, req, res, next) => {
    
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = "Something went wrong ";
    res.status(err.statusCode).json({ message: err.message });
}

export default globalErrorHandler;