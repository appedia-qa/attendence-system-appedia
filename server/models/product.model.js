const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_code: {
        type: String,
        required: true,
        trim: true,
    },
    product_details: {
        ar: {
            name: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            }
        },
        eng: {
            name: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            }
        },
        fr: {
            name: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            }
        }
    },
    product_url: {
        type: String,
        required: true,
        trim: true,
    },
    product_image: {
        type: String,
        required: true,
        trim: true,
    },
    product_category_id: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;