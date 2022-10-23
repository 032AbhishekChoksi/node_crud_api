const mongoose = require("mongoose");

const product = mongoose.model(
    "products",
    mongoose.Schema(
        {
            productName: String,
            productDescription: String,
            productPrice: Number,
            productImage: String
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.productId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    product
}