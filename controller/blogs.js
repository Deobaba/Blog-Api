const path = require("path");
const User = require("../models/user");
const Blog = require("../models/blog");
const ExpressError = require("../utils/expressError");
const catchAsync = require("../utils/catchAsync");

// show all published blog by all users
const Home = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({ state: "published" });
  if (!blogs) throw new ExpressError("No blogs", 500);
  res.status(200).json(blogs);
});

// views a published blog for logged in and nonlogged in users
const Homeview = catchAsync(async (req, res, next) => {
  const { blogid } = req.params;
  const blogs = await Blog.findOne({_id: blogid , state: "published" });
  console.log(blogs)
  blogs.read_count += 1
  await blogs.save();
  res.status(200).json(blogs);
});

// seen by all users, sees all published blogs by all users
// const getHomeBlogs = catchAsync(async (req, res, next) => {
//   console.log(req.user);
//   const blogs = await Blog.find({ state: "published" });
//   res.status(200).json(blogs);
// });


// protected routes !!!!!!


// gets all blogs list (drafts and published) by a specific user
const getAllBlogsByAUser = catchAsync(async (req, res, next) => {
  // shows all publication and drafts owned by the userID
  const { state } = req.query;
  const { id } = req.user;
  if (!state) {
    const foundUser = await User.findById(id).populate("blog");
    if (!foundUser) throw new ExpressError("this user can not be found", 400);
    const blogArray = foundUser.blog;
    return res.status(200).json({
      status: true,
      blogs: blogArray,
    });
  } else if (state === "published") {
    const foundUser = await User.findById(id).populate("blog");
    const blogArray = foundUser.blog;
    const blogstate = blogArray.filter(blog => blog.state === "published")
    console.log(blogstate)
    res.status(200).json({
            status: true,
            blogs: blogstate,
          })
} else if (state === "draft") {
    const foundUser = await User.findById(id).populate("blog");
    const blogArray = foundUser.blog;
    const blogstate = blogArray.filter(blog => blog.state === "draft")
    res.status(200).json({
            status: true,
            blogs: blogstate,
          })
  }
});

// post a new blog
const postNewBlog = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const foundUser = await User.findById(id);
  if (!foundUser) throw new ExpressError("this user can not be found", 400);
  const newBlog = new Blog(req.body);
  foundUser.blog.push(newBlog);
  await newBlog.save();
  await foundUser.save();
  res.status(200).json(newBlog);
});

// views blogs (draft and published) by a user
const getToView = catchAsync(async (req, res, next) => {
  const { blogid } = req.params;
  const { id } = req.user;
  const foundUser = await User.findById(id);
  if (!foundUser) throw new ExpressError("this user does not exist", 400);
  const blog = await Blog.findById(blogid);
  if (!blog) throw new ExpressError("blog does not exist", 400);
  res.status(200).json(blog);
});

// updates a blog (drafts and published)
const editABlog = catchAsync(async (req, res, next) => {
  const { blogid } = req.params;
  const { id } = req.user;
  const editBlog = await Blog.findByIdAndUpdate(blogid, req.body, {
    new: true,
  });
  res.status(200).json({ message: "editted successfully", body: editBlog });
});

// deletes a blog (drafts and published)
const deleteABlog = catchAsync(async (req, res, next) => {
  const { blogid } = req.params;
  const { id } = req.user;
  const blog = await Blog.findByIdAndDelete(blogid);
  const foundUser = await User.findById(id);
  res.status(200).json({ message: "deleted" });
});

// changes the state of a blog from draft to published
const changeState = catchAsync(async (req, res, next) => {
  const { blogid } = req.params;
  const { id } = req.user;
  const foundUser = await User.findById(id);
  const blog = await Blog.findById(blogid);
  blog.state = "published";
  await blog.save();
  // console.log(blog);
  res.status(200).json(blog);
});

//exports
module.exports = {
  getAllBlogsByAUser,
  postNewBlog,
  getToView,
  changeState,
  deleteABlog,
  editABlog,
  Home,
  Homeview,
};
