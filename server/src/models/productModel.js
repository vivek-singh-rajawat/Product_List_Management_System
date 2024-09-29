const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  isRecommended: {
    type: Boolean,
    default: false,
  },
  isBestseller: {
    type: Boolean,
    default: false,
  },
  status: {
     type: Boolean,
    default: false
  }, 
    filePath: {
       type: String
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
