const express = require("express");
const path = require("path");
const {
  getAllBlogsByAUser,
  postNewBlog,
  getToView,
  changeState,
  deleteABlog,
  editABlog,
} = require("../controller/blogs");
const router = express.Router();


router.route("/")
    .get(getAllBlogsByAUser)
    .post(postNewBlog);

router.route("/:blogid")
  .get(getToView)
  .put(editABlog)
  .delete(deleteABlog)
  .post(changeState);

module.exports = router;
