const express = require("express");
const userController = require("./user.controller");
const router = express.Router();
const { uploadImage } = require("../../../../middlewares/uploadImages/index");
const { authenticate } = require("../../../../middlewares/auth/index");
const { validatePostUser } = require("../../../../middlewares/validation/users/postUser");

router.post("/users", validatePostUser, userController.createUser);
router.post("/users/login", userController.login);
router.patch("/users/upload-avatar", authenticate, uploadImage("avatars"), userController.uploadAvatar);

module.exports = router;