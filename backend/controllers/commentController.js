const Comment = require('../models/Comment');
const Post    = require('../models/Post');

// @GET /api/comments/:postId
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @POST /api/comments/:postId
const addComment = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.create({
      content,
      author: req.user._id,
      post: req.params.postId,
    });
    await comment.populate('author', 'username');
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @DELETE /api/comments/:id
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await comment.deleteOne();
    res.json({ message: 'Comment removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getComments, addComment, deleteComment };