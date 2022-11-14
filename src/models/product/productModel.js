const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})
// {
//   color: {
//     type: mongoose.Schema,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   images: [],
// },
const colorSchema = mongoose.Schema({
  color: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  images: [],
})
const imageSchema = mongoose.Schema({
  urlImage: {
    type: String,
    required: true,
    default: '',
  },
})
const optionSchema = mongoose.Schema({
  productOptionName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  promotion: {
    type: Number,
    required: true,
    default: 0,
  },
  colors: [colorSchema],
})
const detailSchema = mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
})
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Manufacturer',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    productOptions: [optionSchema],
    description: {
      type: String,
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Subcategory',
    },
    comments: [],
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    detailSpecs: [detailSchema],
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product