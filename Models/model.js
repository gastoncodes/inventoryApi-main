const mongoose = require("mongoose");

//_id to id
const id = (schema) => {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
    },
  });
};

//model for creating a new user
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
  },
  password: {
    type: String,
  },
  confirm_password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Users = new mongoose.model("users", UsersSchema);

//model for creating a new business
const BusinessSchema = new mongoose.Schema({
  bss_name: {
    type: String,
  },
  bss_owner: {
    type: String,
  },
  bss_location: {
    type: String,
  },
  bss_type: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Businesses = new mongoose.model("businesses", BusinessSchema);

//model for creating a new product
const ProductsSchema = new mongoose.Schema({
  pdt_name: {
    type: String,
  },
  pdt_brand: {
    type: String,
  },
  pdt_quantity: {
    type: String,
  },
  pdt_description: {
    type: String,
  },
  pdt_price: {
    type: String,
  },
  bss_id: {
    type: String,
  },
  pdt_image: {
    type: String,
  },
  pdt_qrcode: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Products = new mongoose.model("products", ProductsSchema);

module.exports = {
  Users,
  Products,
  Businesses,
};
