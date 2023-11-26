const express = require("express");
const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateRole,
    deleteUser
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/admin/users/").get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);

router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizedRoles("admin"), updateRole)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;