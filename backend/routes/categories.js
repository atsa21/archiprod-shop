const express = require("express");

const checkAuth = require("../middleware/check-auth");
const categoryControllers = require("../controllers/category-controller");

const router = express.Router();

router.post("", checkAuth, categoryControllers.createCategory);

router.put("/:id", checkAuth, categoryControllers.addCategoryTypeById);

router.get("", categoryControllers.getCategories);

router.get("/:id", categoryControllers.getCategoryById);

router.delete("/:id", checkAuth, categoryControllers.deleteCategoryById);

module.exports = router;