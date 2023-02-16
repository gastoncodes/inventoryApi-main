const express = require("express");
const { Products } = require("../Models/model");
const router = express.Router();

//api for creating a new product
/*


here, since a product can have a same name, but different branding 
company, we shall there for consider both the product name and brand to authenticate new pdts
also,
since all products from different businesses shall be stored in the same table
we shall send them to the database with the id of the business so that we can easily display them in the right business


*/
router.post("/newpdt", async (req, res) => {
  const pdtcheck = await Products.find({
    pdt_name: { $eq: req.body.pdt_name },
    pdt_brand: { $eq: req.body.pdt_brand },
    bss_id: { $eq: req.body.bss_id },
  });
  if (pdtcheck) {
    res.send({
      data: "product exists",
      status: false,
    });
  } else {
    const pdt = new Products({
      pdt_name: req.body.pdt_name,
      pdt_brand: req.body.pdt_brand,
      pdt_quantity: req.body.pdt_quantity,
      pdt_description: req.body.pdt_description,
      pdt_price: req.body.pdt_price,
      // images and bar code scanner shall be handled later.
    });
    try {
      const new_pdt = await pdt.save();
      res.send({
        data: "Product Added",
        status: true,
        result: new_pdt,
      });
    } catch (error) {
      res.send({
        status: false,
        result: error,
        data: "Un expected error",
      });
    }
  }
});

//api for displaying all products
router.get("/pdt", async (req, res) => {
  try {
    const all_pdt = await Products.find();
    res.send({
      data: "Prodcuts available",
      status: true,
      result: all_pdt,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for deleting all products at once
// this api is specifically for backend use..... do not render it in the front end
// because it is more harmful to the data
router.delete("/delete-pdt", async (req, res) => {
  try {
    const all_pdt = await Products.find();
    if (all_pdt) {
      const delete_pdt = await Products.deleteMany();
      res.send({
        status: true,
        data: "deleted",
        result: delete_pdt,
      });
    } else {
      res.send({
        status: false,
        data: "No Products Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for deleting a business by a given id
router.delete("/pdt/:id", async (req, res) => {
  try {
    const current_pdt = await Products.findById(req.params.id);
    if (current_pdt) {
      const delete_pdt = await Products.deleteOne({
        _id: req.params.id,
      });
      res.send({
        status: true,
        data: "deleted",
        result: delete_pdt,
      });
    } else {
      res.send({
        status: true,
        data: "business not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for editing a business/organisation
router.put("/pdt/:id", async (req, res) => {
  try {
    const current_pdt = await Products.findById(req.params.id);
    const updated_pdt = await Products.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          pdt_name: req.body.pdt_name || current_pdt.pdt_name,
          pdt_brand: req.body.pdt_brand || current_pdt.pdt_brand,
          pdt_quantity: req.body.pdt_quantity || current_pdt.pdt_quantity,
          pdt_description:
            req.body.pdt_description || current_pdt.pdt_description,
          pdt_price: req.body.pdt_price || current_pdt.pdt_price,
        },
      }
    );
    res.send({
      data: "Product Updated",
      status: true,
      result: updated_pdt,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      data: "Un expexted error",
      result: error,
    });
  }
});

module.exports = router;
