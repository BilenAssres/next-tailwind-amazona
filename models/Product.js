import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    status: { type: String, required: true},
    image: { type: String, required: true },
    price: { type: Number, required: true },
    // rating: { type: Number, required: true, default: 0 },
    // numReviews: { type: Number, required: true, default: 0 },
    isSoldOut: { type: Boolean, required: true, default:false  },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    mobile: {type: String, required: true},
    banner: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
