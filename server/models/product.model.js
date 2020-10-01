const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_code: {
        type: String,
        unique: true,
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
            }
        },
        eng: {
            name: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
            }
        },
        fr: {
            name: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
            }
        }
    },
    product_url: {
        type: String,
        unique: true,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    product_category_id: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            delete ret.createdAt
            delete ret.updatedAt
        },
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;