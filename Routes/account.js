const express = require("express");
const { Users } = require("../Models/model");
const router = express.Router();

//api for creating a new user
router.post("/new", async (req, res) => {
  const user_tel_check = await Users.findOne({
    tel: { $eq: req.body.phone },
  });
  if (user_tel_check) {
    res.send({
      data: "phone number already exists",
      status: false,
    });
  } else {
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      tel: parseInt(req.body.tel),
      password: req.body.password,
      confirm_password: req.body.confirm_password,
    });
    try {
      const new_user = await user.save();
      res.send({
        data: "User Account Created",
        status: true,
        result: new_user,
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

//api for logging in a user
router.post("/user", async (req, res) => {
  try {
    const current_user = await Users.find({
      $and: [{ password: req.body.password }, { tel: req.body.tel }],
    });
    if (current_user) {
      res.send({ user: current_user, status: true, data: "Login Sucessful" });
    } else {
      res.send({ status: false, data: "No matching details" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

//api for editing a user
router.put("/user/:id", async (req, res) => {
  try {
    const current_user = await Users.findById(req.params.id);
    const updated_user = await Users.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          name: req.body.name || current_user.name,
          email: req.body.email || current_user.email,
          tel: parseInt(req.body.tel) || current_user.tel,
          password: req.body.password || current_user.password,
          confirm_password:
            req.body.confirm_password || current_user.confirm_password,
        },
      }
    );
    res.send({
      data: "User Updated",
      status: true,
      result: updated_user,
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

//api for deleting a user
router.delete("/user/:id", async (req, res) => {
  try {
    const current_user = await Users.findById(req.params.id);
    if (current_user) {
      const delete_user = await User.deleteOne({
        _id: req.params.id,
      });
      res.send({
        status: true,
        data: "deleted",
        result: delete_user,
      });
    } else {
      res.send({
        status: true,
        data: "user not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});
//api for deleting all users at once
// this api is specifically for backend use..... do not render it in the front end
// because it is more harmful to the data
router.delete("/dlete-user", async (req, res) => {
  try {
    const all_users = await Users.find();
    if (all_users) {
      const delete_users = await Users.deleteMany();
      res.send({
        status: true,
        data: "deleted",
        result: delete_users,
      });
    } else {
      res.send({
        status: false,
        data: "No users Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

//api for displaying all users
router.get("/users", async (req, res) => {
  try {
    const all_users = await Users.find();
    res.send({
      data: "Users available",
      status: true,
      result: all_users,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "Un expected error", result: error });
  }
});

module.exports = router;
