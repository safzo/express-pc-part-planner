var express = require("express");
var router = express.Router();

var async = require("async");

var Category = require("../models/category");
var ComputerPart = require("../models/computerpart");
var Manufacturer = require("../models/manufacturer");

// Require controller modules.
var category_controller = require("../controllers/categoryController");
var computerpart_controller = require("../controllers/computerpartController");
var manufacturer_controller = require("../controllers/manufacturerController");

/* GET home page. */
router.get("/", function (req, res) {
  res.redirect("list");
});

router.get("/list", function (req, res, next) {
  if (typeof localStorage === "undefined" || localStorage === null) {
    console.log("hello");
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
    localStorage.setItem("userList", JSON.stringify({}));
  }
  async.parallel(
    {
      categories: function (callback) {
        Category.find(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      res.render("list", {
        title: "My List - PC Part Planner",
        userList: JSON.parse(localStorage.getItem("userList")),
        categories: results.categories,
      });
    }
  );
});

/// CATEGORY ROUTES ///

// GET request for creating Category. NOTE This must come before route for id (i.e. display category).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete Category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete Category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update Category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update Category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all Categories.
router.get('/categories', category_controller.category_list);

/// COMPUTERPART ROUTES ///

// GET request for creating ComputerPart. NOTE This must come before route for id (i.e. display computerpart).
router.get('/component/create', computerpart_controller.computerpart_create_get);

// POST request for creating ComputerPart.
router.post('/component/create', computerpart_controller.computerpart_create_post);

// GET request to delete ComputerPart.
router.get('/component/:id/delete', computerpart_controller.computerpart_delete_get);

// POST request to delete ComputerPart.
router.post('/component/:id/delete', computerpart_controller.computerpart_delete_post);

// GET request to update ComputerPart.
router.get('/component/:id/update', computerpart_controller.computerpart_update_get);

// POST request to update ComputerPart.
router.post('/component/:id/update', computerpart_controller.computerpart_update_post);

// GET request for one ComputerPart.
router.get('/component/:id', computerpart_controller.computerpart_detail);

// GET request for list of all ComputerParts.
router.get('/components', computerpart_controller.computerpart_list);

/// MANUFACTURER ROUTES ///

// GET request for creating Manufacturer. NOTE This must come before route for id (i.e. display manufacturer).
router.get('/manufacturer/create', manufacturer_controller.manufacturer_create_get);

// POST request for creating Manufacturer.
router.post('/manufacturer/create', manufacturer_controller.manufacturer_create_post);

// GET request to delete Manufacturer.
router.get('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_get);

// POST request to delete Manufacturer.
router.post('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_post);

// GET request to update Manufacturer.
router.get('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_get);

// POST request to update Manufacturer.
router.post('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_post);

// GET request for one Manufacturer.
router.get('/manufacturer/:id', manufacturer_controller.manufacturer_detail);

// GET request for list of all Manufactuers.
router.get('/manufacturers', manufacturer_controller.manufacturer_list);

module.exports = router;
