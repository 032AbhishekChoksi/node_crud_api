const { product } = require("../models/products.model");

async function createProduct(params, callback) {
    if (!params.productName) {
        return callback({ message: "Product Name is Required!" }, "");
    }

    const productModel = await product(params);
    productModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getProducts(params, callback) {
    const productName = params.productName;

    var condition = productName ? { productName: { $regex: new RegExp(productName), $options: "i" } } : {};

    await product
        .find(condition)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getProductById(params, callback) {
    const productId = params.productId;

    await product
        .findById(productId)
        .then((response) => {
            if (!response) return callback({ message: "Product ID Invalid!" }, "")
            else return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateProduct(params, callback) {
    const productId = params.productId;

    await product
        .findByIdAndUpdate(productId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) return callback({ message: "Product ID Invalid!" }, "")
            else return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteProduct(params, callback) {
    const productId = params.productId;

    await product
        .findByIdAndRemove(productId)
        .then((response) => {
            if (!response) return callback({ message: "Product ID Invalid!" }, "")
            else return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}