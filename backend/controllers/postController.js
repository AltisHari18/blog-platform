const Post = require('../models/Post');

// @GET /api/posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/posts/:id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @POST /api/posts
const createPost = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = await Post.create({ title, content, tags, author: req.user._id });
    await post.populate('author', 'username email');
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @PUT /api/posts/:id
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const { title, content, tags } = req.body;
    post.title   = title   || post.title;
    post.content = content || post.content;
    post.tags    = tags    || post.tags;

    const updated = await post.save();
    await updated.populate('author', 'username email');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };