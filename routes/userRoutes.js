const express = require("express");
const { signup, checkId, logIn } = require("../controllers/authController");
const {
  getall,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const {
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getAccountsAndCategories,
} = require("../controllers/categoryController");
const {
  getBudgets,
  setBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");
const router = express.Router();

//MIDDLEWARE
router.route("/accounts/:id").get(getAllAccounts).post(createAccount); //Here id is user id
router.route("/accounts/:id").patch(updateAccount).delete(deleteAccount); //Here id is account id

// router.param("id", checkId);
router.post("/signup", signup);
router.post("/login", logIn);
router.get("/users", getall);

router.route("/:id").get(getUser).delete(deleteUser);

//CATEGORY ROUTES
router
  .route("/categories/:id")
  .get(getAllCategories)
  .post(createCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

//BUDGET ROUTES
router
  .route("/budgets/:id")
  .get(getBudgets)
  .post(setBudget)
  .patch(updateBudget)
  .delete(deleteBudget);

router.get("/data/:id", getAccountsAndCategories);
module.exports = router;
