const express = require("express");
const { Businesses } = require("../Models/model");
const router = express.Router();

//api for creating a new business / organisation
router.post("/newbss", async (req, res) => {
  const bss_check = await Businesses.findOne({
    bss_name: { $eq: req.body.bss_name },
  });
  if (bss_check) {
    res.send({
      data: "Business name taken",
      status: false,
    });
  } else {
    const business = new Businesses({
      bss_name: req.body.bss_name,
      bss_owner: req.body.bss_owner,
      bss_location: req.body.bss_location,
      bss_type: req.body.bss_type,
    });
    try {
      const new_business = await business.save();
      res.send({
        data: "Business Created",
        status: true,
        result: new_business,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        result: error,
        data: "Un expected error",
      });
    }
  }
});

//api for editing a business/organisation
router.put("/bss/:id", async (req, res) => {
  try {
    const current_bss = await Businesses.findById(req.params.id);
    const updated_bss = await Businesses.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          bss_name: req.body.bss_name || current_bss.bss_name,
          bss_owner: req.body.bss_owner || current_bss.bss_owner,
          bss_location: req.body.bss_location || current_bss.bss_location,
          bss_type: req.body.bss_type || current_bss.bss_type,
        },
      }
    );
    res.send({
      data: "Business Updated",
      status: true,
      result: updated_bss,
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

//api for deleting a business by a given id
router.delete("/bss/:id", async (req, res) => {
  try {
    const current_bss = await Businesses.findById(req.params.id);
    if (current_bss) {
      const delete_bss = await Businesses.deleteOne({
        _id: req.params.id,
      });
      res.send({
        status: true,
        data: "deleted",
        result: delete_bss,
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

//api for deleting all business at once
// this api is specifically for backend use..... do not render it in the front end
// because it is more harmful to the data
router.delete("/delete-bss", async (req, res) => {
  try {
    const all_bss = await Businesses.find();
    if (all_bss) {
      const delete_bss = await Businesses.deleteMany();
      res.send({
        status: true,
        data: "deleted",
        result: delete_bss,
      });
    } else {
      res.send({
        status: false,
        data: "No businesses Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for displaying all businesses
router.get("/bss", async (req, res) => {
  try {
    const all_bss = await Businesses.find();
    res.send({
      data: "Businesses available",
      status: true,
      result: all_bss,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});
//gets single business basing on the id
router.get("/bss/:id", async (req, res) => {
  try {
    const bss = await Businesses.findById(req.params.id);
    if (bss) {
      res.send({
        status: true,
        result: bss,
      });
    } else {
      res.send({
        status: false,
        data: "No business found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
